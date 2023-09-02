import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import Logo from "../img/icom.svg";
import DefaultIcon from "../img/user.svg";

function Header() {
  const [user, setUser] = useState(false);
  return (
    <header className="header">
      <NavLink className="logo" to="/">
        <div className="img-background">
          <img className="logo-img" alt="log" src={Logo} />
        </div>
        <span className="logo-title">ŌkamiAnime</span>
      </NavLink>
      <input type="text" placeholder="Поиск" className="input-title" />
      <NavLink className="header-cat" to="catalogue">
        Каталог
      </NavLink>
      <NavLink className="header-random" to="article/:random">
        Случайное
      </NavLink>
      {user && (
        <Link className="header-profile" to="profile">
          <span className="profile-name">AnalDestroyer</span>
          <img className="profile-pic" alt="profile" src={DefaultIcon} />
        </Link>
      )}
      {!user && (
        <div className="aunth-buttons">
          <NavLink to="sign-up">Зарагестрироваться</NavLink>
          <NavLink to="sign-in">Войти</NavLink>
        </div>
      )}
    </header>
  );
}
export default Header;
