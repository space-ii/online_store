const ApiError = require("../error/apiError");
const { Type } = require("../models/models");

class TypeController {
  async create(req, res) {
    // try {
    const { name } = req.body;

    const type = await Type.create({ name });
    return res.json(type);
    // } catch (error) {
    //   return res.status(500).json({ message: error.message });
    // }
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
}

module.exports = new TypeController();
