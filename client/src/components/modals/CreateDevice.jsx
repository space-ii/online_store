import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { getAllBrands } from "../../http/brandApi";
import { createDevice } from "../../http/deviceApi";
import { getAllTypes } from "../../http/typeApi";
import { Context } from "../../index";
import * as bootstrap from "bootstrap";

export default observer(function CreateDevice() {
  const { typeStore } = useContext(Context);
  const { brandStore } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  // const [type, setType] = useState(null);
  // const [brand, setBrand] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    getAllTypes().then((data) => typeStore.setTypes(data));
    getAllBrands().then((data) => brandStore.setBrands(data));
  }, []);

  function addInfo(e) {
    e.preventDefault();
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  }

  function removeInfo(number) {
    setInfo(info.filter((i) => i.number !== number));
  }

  function changeInfo(key, value, number) {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  }

  function selectFile(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files);
  }

  // function addDevice() {
  //   const formData = new FormData();
  //   console.log("Selected Brand ID:", brandStore.selectedBrand);
  //   console.log("Selected Type ID:", typeStore.selectedType);
  //   formData.append("name", name);
  //   formData.append("price", `${price}`);
  //   formData.append("img", file);
  //   formData.append("brandId", brandStore.selectedBrand);
  //   formData.append("typeId", typeStore.selectedType);
  //   formData.append("info", JSON.stringify(info));
  //   createDevice(formData);
  // }

  async function addDevice() {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", `${price}`);
      formData.append("img", file);
      formData.append("brandId", brandStore.selectedBrand);
      formData.append("typeId", typeStore.selectedType);
      formData.append("info", JSON.stringify(info));

      await createDevice(formData);
      window.location.reload();
      // document.getElementById("staticCreateDeviceForm").reset();
      console.log(formData);
      const modal = document.getElementById("staticCreateDevice");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      const modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
      modalInstance.hide();
    } catch (error) {
      console.error(error);
      alert(
        "При добавлении устройства произошла ошибка! Заполните обязательные поля!"
      );
    }
  }

  return (
    <div
      className="modal fade"
      id="staticCreateDevice"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Добавить устройство
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              className="d-flex flex-column p-2"
              id="staticCreateDeviceForm"
            >
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => typeStore.setSelectedType(e.target.value)}
              >
                <option defaultValue>Выберите тип</option>
                {typeStore.types.map((type) => (
                  <option
                    key={type.id}
                    value={type.id}
                    // onClick={() => typeStore.setSelectedType(type)}
                  >
                    {type.name}
                  </option>
                ))}
              </select>

              <select
                className="form-select mt-3"
                aria-label="Default select example"
                onChange={(e) => brandStore.setSelectedBrand(e.target.value)}
              >
                <option defaultValue>Выберете бренд</option>
                {brandStore.brands.map((brand) => (
                  <option
                    key={brand.id}
                    value={brand.id}
                    // onClick={() => {
                    //   brandStore.setSelectedBrand(brand);
                    // }}
                  >
                    {brand.name}
                  </option>
                ))}
              </select>

              <input
                className="form-control mt-3"
                placeholder="Введите название устройства"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="form-control mt-3"
                placeholder="Введите стоимость устройства"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                type="number"
              />

              <input
                className="form-control mt-3"
                type="file"
                onChange={selectFile}
              />
              <hr />
              <button className="btn btn-secondary" onClick={addInfo}>
                Добавить новое свойство
              </button>
              {info.map((i) => (
                <div className="row mt-3" key={i.number}>
                  <div className="col-5">
                    <input
                      className="form-control"
                      value={i.title}
                      onChange={(e) =>
                        changeInfo("title", e.target.value, i.number)
                      }
                      placeholder="Введите название свойства"
                    />
                  </div>
                  <div className="col-5">
                    <input
                      className="form-control"
                      value={i.description}
                      onChange={(e) =>
                        changeInfo("description", e.target.value, i.number)
                      }
                      placeholder="Введите описание свойства"
                    />
                  </div>
                  <div className="col-2 d-flex justify-content-end">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeInfo(i.number)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Закрыть
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addDevice}
              // data-bs-dismiss="modal"
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
