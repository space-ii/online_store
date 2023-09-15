import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import DeviceItem from "./DeviceItem";

export default observer(function DeviceList() {
  const { deviceStore } = useContext(Context);
  return (
    <div className="d-flex flex-wrap">
      {deviceStore.devices.map((device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </div>
  );
});
