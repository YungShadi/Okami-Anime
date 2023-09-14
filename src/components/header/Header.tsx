import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.css";
import Logo from "../img/icom.svg";
import DefaultIcon from "../img/user.svg";

// header, navigation, user
function Header() {
  // const [user, setUser] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const [scrollIsEnough, setScrollIsEnough] = useState(0);
  // const [isLogined, setIsLogined] = useState(false);
  const username = useSelector((state) => state.login.username);

  useEffect(() => {
    const onScrollHandle = () => {
      const scrollYPos = window.scrollY;
      setScrollIsEnough(scrollYPos);
    };
    window.addEventListener("scroll", onScrollHandle);
  }, []);

  return (
    // here we have nav links to change visible page
    <header
      className={`header ${scrollIsEnough > 125 ? "off-screen-fixed" : ""}`}
      ref={headerRef}
    >
      <button className="header-mobile-button mobile-menu" type="button">
        menu
      </button>
      <Link className="logo" to="/">
        <div className="img-background">
          <img className="logo-img" alt="log" src={Logo} />
        </div>
        <span className="logo-title">ŌkamiAnime</span>
      </Link>
      <button type="button" className="header-mobile-button mobile-search">
        Поиск
      </button>
      {location.pathname !== "/catalogue" && (
        <input type="text" placeholder="Поиск" className="input-title" />
      )}
      <div className="nav-buttons">
        <NavLink className="header-cat" to="catalogue">
          Каталог
        </NavLink>
        {/* should go to a random title */}
        <NavLink className="header-random" to="article/:random">
          Случайное
        </NavLink>
      </div>
      {/* user display depending on localStorage(maybe there is another way) */}
      {false && (
        <Link className="header-profile" to="AnalaDestroyer/profile">
          <span className="profile-name">{username}</span>
          <img className="profile-pic" alt="profile" src={DefaultIcon} />
        </Link>
      )}
      {!false && (
        <div className="aunth-buttons">
          <NavLink to="sign-up">Зарагестрироваться</NavLink>
          <NavLink to="sign-in">Войти</NavLink>
        </div>
      )}
    </header>
  );
}
export default Header;
