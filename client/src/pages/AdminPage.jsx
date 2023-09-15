import React from "react";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";

export default function AdminPage() {
  return (
    <div className="container d-flex flex-column" style={{ width: "50%" }}>
      <button
        type="button"
        className="btn btn-outline-dark mt-4 p-2"
        data-bs-toggle="modal"
        data-bs-target="#staticCreateType"
      >
        Добавить тип
      </button>
      <button
        type="button"
        className="btn btn-outline-dark mt-4 p-2"
        data-bs-toggle="modal"
        data-bs-target="#staticCreateBrand"
      >
        Добавить бренд
      </button>
      <button
        type="button"
        className="btn btn-outline-dark mt-4 p-2"
        data-bs-toggle="modal"
        data-bs-target="#staticCreateDevice"
      >
        Добавить устройство
      </button>
      <CreateType />
      <CreateBrand />
      <CreateDevice />
    </div>
  );
}
