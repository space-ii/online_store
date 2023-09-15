import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import BrandStore from "./store/BrandStore";
import TypeStore from "./store/TypeStore";
import DeviceStore from "./store/DeviceStore";
import PageStore from "./store/PageStore";

export const Context = createContext(null);
console.log(process.env.REACT_APP_API_URL);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      userStore: new UserStore(),
      brandStore: new BrandStore(),
      typeStore: new TypeStore(),
      deviceStore: new DeviceStore(),
      pageStore: new PageStore(),
    }}
  >
    <App />
  </Context.Provider>
);
