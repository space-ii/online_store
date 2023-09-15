import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../index";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import TypeBar from "../components/TypeBar";
import { getAllTypes } from "../http/typeApi";
import { getAllBrands } from "../http/brandApi";
import { getAllDevices } from "../http/deviceApi";
import Pages from "../components/Pages";

export default observer(function Shop() {
  const { typeStore } = useContext(Context);
  const { brandStore } = useContext(Context);
  const { deviceStore } = useContext(Context);
  const { pageStore } = useContext(Context);

  useEffect(() => {
    getAllTypes().then((data) => typeStore.setTypes(data));
    getAllBrands().then((data) => brandStore.setBrands(data));
    // getAllDevices(null, null, 1, 4).then((data) => {
    //   deviceStore.setDevices(data.rows);
    //   pageStore.setTotalCount(data.count);
    // });
  }, []);

  useEffect(() => {
    getAllDevices(
      typeStore.selectedType.id,
      brandStore.selectedBrand.id,
      pageStore.page,
      pageStore.limit
    ).then((data) => {
      deviceStore.setDevices(data.rows);
      pageStore.setTotalCount(data.count);
      // console.log(data);
    });
  }, [pageStore.page, typeStore.selectedType, brandStore.selectedBrand]);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-3">
          <TypeBar />
        </div>
        <div className="col-9">
          <BrandBar />
          <DeviceList />
          <Pages />
        </div>
      </div>
    </div>
  );
});
