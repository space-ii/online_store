import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";

export default observer(function BrandBar() {
  const { brandStore } = useContext(Context);
  return (
    <div className="d-flex flex-wrap">
      {brandStore.brands.map((brand) => (
        <div
          key={brand.id}
          style={{ cursor: "pointer" }}
          className={`p-2 card ${
            brand.id === brandStore.selectedBrand.id ? "border-secondary" : ""
          }`}
          onClick={() => brandStore.setSelectedBrand(brand)}
        >
          {brand.name}
        </div>
      ))}
    </div>
  );
});
