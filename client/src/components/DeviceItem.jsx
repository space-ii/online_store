import React, { useContext } from "react";
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { Context } from "..";

export default function DeviceItem({ device }) {
  const { brandStore } = useContext(Context);
  const navigate = useNavigate();

  const brand = brandStore.brands.find((brand) => brand.id === device.brandId);

  function handleClick() {
    navigate(DEVICE_ROUTE + "/" + device.id);
  }
  return (
    <div className="col-3 mt-3" onClick={handleClick}>
      <div className="card" style={{ cursor: "pointer", width: 150 }}>
        <img
          src={process.env.REACT_APP_API_URL + device.img}
          width={150}
          height={150}
          alt=""
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          {brand && <div>{brand.name}</div>}
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <img width={18} height={18} src={star} alt="" />
          </div>
        </div>
        <div>{device.name}</div>
      </div>
    </div>
  );
}
