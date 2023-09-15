import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";

export default observer(function TypeBar() {
  const { typeStore } = useContext(Context);
  return (
    <ul className="list-group">
      {typeStore.types.map((type) => (
        <li
          className={`list-group-item ${
            type.id === typeStore.selectedType.id ? " active" : ""
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => typeStore.setSelectedType(type)}
          key={type.id}
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
});
