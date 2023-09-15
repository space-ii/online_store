import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./index";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { check } from "./http/userApi";

export default observer(function App() {
  const { userStore } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setTimeout(() => {
    check()
      .then(() => {
        userStore.setUser(true);
        userStore.setIsAuth(true);
      })
      .finally(() => setLoading(false));
    // }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});
