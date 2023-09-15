import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { login, registration } from "../http/userApi";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";

export default observer(function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userStore } = useContext(Context);
  const navigate = useNavigate();

  const click = async (e) => {
    e.preventDefault();
    try {
      let user;

      if (isLogin) {
        user = await login(email, password);
      } else {
        user = await registration(email, password);
      }
      userStore.setUser(user);
      userStore.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center  align-items-center"
      style={{ height: window.innerHeight - 56 }}
    >
      <div className="card" style={{ width: 600 }}>
        <form className="d-flex flex-column p-5">
          <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
          <input
            className="form-control mt-3"
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control mt-3"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <div className="mt-3 d-flex justify-content-between align-items-center">
            {isLogin ? (
              <div className="d-flex">
                <div className="me-2">Нет аккаунта?</div>
                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
              </div>
            ) : (
              <div className="d-flex">
                <div className="me-2">Есть аккаунта?</div>
                <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            )}
            <button
              className="align-self-end btn btn-outline-secondary"
              onClick={click}
            >
              {isLogin ? "Войти" : "Регистрация"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});
