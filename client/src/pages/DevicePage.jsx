import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import bigStar from "../assets/bigStar.png";
import { getOneDevice } from "../http/deviceApi";

export default function DevicePage() {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  console.log(device);
  // console.log(id);
  useEffect(() => {
    getOneDevice(id).then((data) => setDevice(data));
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          {device.img && (
            <img
              src={process.env.REACT_APP_API_URL + device.img}
              width={300}
              height={300}
              alt=""
            />
          )}
        </div>
        <div className="col-4">
          <div className="row d-flex flex-column align-items-center">
            <h2 className="text-center">{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                color: "#fff",
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </div>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <div
            className="card d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3 className="text-center">{device.price} руб.</h3>
            <button className="btn btn-outline-dark">Добавить в корзину</button>
          </div>
        </div>
      </div>
      <div className="row mt-3 d-flex flex-column">
        <h2>Характеристики</h2>
        {device.info.map((info, index) => (
          <div
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </div>
        ))}
      </div>
    </div>
  );
}
