import React from "react";
import logo from "../images/Vector.svg";
import { Link, useLocation } from "react-router-dom";
export default Header;
function Header(props) {
  const location = useLocation();
  const path = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in";
  const title = location.pathname === "/sign-in" ? "Регистрация" : "Вход";
  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип сайта" className="header__logo" />
        {props.loggedIn ? (
          <>
            <span className="header__email">{props.email}</span>
            <Link
              className="header__link-reg"
              to="/"
              style={{ color: "#A9A9A9" }}
              onClick={props.onSignOut}>
              Выйти
            </Link>
          </>
        ) : (
          <Link className="header__link-reg" to={path}>
            {title}
          </Link>
        )}
    </header>
  );
}
