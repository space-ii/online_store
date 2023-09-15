import React, { useState } from "react";
import { createBrand } from "../../http/brandApi";

export default function CreateBrand() {
  const [value, setValue] = useState("");

  function addBrand() {
    createBrand({ name: value }).then(() => setValue(""));
  }

  return (
    <div
      className="modal fade"
      id="staticCreateBrand"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Добавить новый бренд
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="d-flex flex-column p-5">
              <input
                className="form-control"
                placeholder="Введите название бренда"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
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
              onClick={addBrand}
              data-bs-dismiss="modal"
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
