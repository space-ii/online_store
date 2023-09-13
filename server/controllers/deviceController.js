const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/apiError");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (e) {
      console.error("Error creating device:", e);
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 24;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return res.json(devices);
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });

      if (!device) {
        return res.status(404).json({ message: `Девайс с id ${id} не найден` });
      }

      return res.json(device);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const device = await Device.findOne({ where: { id } });

      if (!device) {
        return next(ApiError.notFound(`Девайс с id ${id} не найден`));
      }

      await device.destroy();

      return res.json({ message: `Девайс с id ${id} удален` });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new DeviceController();
