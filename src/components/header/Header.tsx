import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import Logo from "../img/icom.svg";
import DefaultIcon from "../img/user.svg";

function Header() {
  return (
    <header className="header">
      <NavLink className="logo" to="/">
        <div className="img-background">
          <img className="logo-img" alt="log" src={Logo} />
        </div>
        <span className="logo-title">ŌkamiAnime</span>
      </NavLink>
      <input type="text" placeholder="Поиск" className="input-title" />
      <NavLink className="header-cat" to="title">
        Каталог
      </NavLink>
      <NavLink className="header-random" to="/">
        Случайное
      </NavLink>
      <div className="header-profile">
        <span className="profile-name">AnalDestroyer</span>
        <img className="profile-pic" alt="profile" src={DefaultIcon} />
      </div>
    </header>
  );
}
export default Header;
