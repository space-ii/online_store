import React, { useContext } from "react";
import { Context } from "../index";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";

export default observer(function NavBar() {
  const { userStore } = useContext(Context);
  const navigate = useNavigate();

  function handleAdminClick() {
    navigate(ADMIN_ROUTE);
  }

  function handleLogoutClick() {
    userStore.setUser({});
    userStore.setIsAuth(false);
  }

  function handleAuthClick() {
    navigate(LOGIN_ROUTE);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to={SHOP_ROUTE}>
          Online Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {userStore.isAuth ? (
            <div className="navbar-nav ms-auto">
              <button
                type="button"
                className="btn btn-light"
                onClick={handleAdminClick}
              >
                Админ панель
              </button>
              <button
                type="button"
                className="btn btn-light ms-2"
                onClick={handleLogoutClick}
              >
                Выйти
              </button>
            </div>
          ) : (
            <div className="navbar-nav ms-auto">
              <button
                type="button"
                className="btn btn-light"
                onClick={handleAuthClick}
              >
                Авторизация
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
});
