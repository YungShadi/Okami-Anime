import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Logo from "../img/icom.svg";
import DefaultIcon from "../img/user.svg";

function Header() {
  return (
    <header className="header">
      <Link className="logo" to="/">
        <div className="img-background">
          <img className="logo-img" alt="log" src={Logo} />
        </div>
        <span className="logo-title">ŌkamiAnime</span>
      </Link>
      <input type="text" placeholder="Поиск" className="input-title" />
      <Link className="header-cat" to="catalogue">
        Каталог
      </Link>
      <Link className="header-random" to="/">
        Случайное
      </Link>
      <div className="header-profile">
        <span className="profile-name">AnalDestroyer</span>
        <img className="profile-pic" alt="profile" src={DefaultIcon} />
      </div>
    </header>
  );
}
export default Header;
