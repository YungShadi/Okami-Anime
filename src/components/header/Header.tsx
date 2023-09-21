import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./header.css";
import { UserDto } from "../../types/userDto";
import { MobileDto } from "../../types/mobileDto";
import Logo from "../img/icom.svg";
import DefaultIcon from "../img/user.svg";
import { useAuth } from "../../hooks/useAuth";
import MobileMenu from "./mobile-meu/mobileMenu";
import { toggleMenuAction } from "../../redux/mobileSlcie";
import search from "../img/search-frame.svg";

// header, navigation, user
function Header() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const headerRef = useRef(null);
  const [scrollIsEnough, setScrollIsEnough] = useState(0);
  const username = useSelector(
    (state: { auth: UserDto }) => state?.auth.username
  );
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state?.mobile.isMenuOpened
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const onScrollHandle = () => {
      const scrollYPos = window.scrollY;
      setScrollIsEnough(scrollYPos);
    };
    window.addEventListener("scroll", onScrollHandle);
  }, []);

  return (
    <>
      {menuState && <MobileMenu />}
      {/* // here we have nav links to change visible page */}
      <header
        className={`header ${scrollIsEnough > 125 ? "off-screen-fixed" : ""}`}
        ref={headerRef}
      >
        <button
          className="header-mobile-button mobile-menu"
          type="button"
          onClick={() => dispatch(toggleMenuAction(!menuState))}
        >
          <div className="line-burger" />
          <div className="line-burger" />
          <div className="line-burger" />
        </button>
        <Link className="logo" to="/">
          <div className="img-background">
            <img className="logo-img" alt="log" src={Logo} />
          </div>
          <span className="logo-title">ŌkamiAnime</span>
        </Link>
        <button type="button" className="header-mobile-button mobile-search">
          <img src={search} alt="search" />
        </button>
        {location.pathname !== "/catalogue" && (
          <input type="text" placeholder="Поиск" className="input-title" />
        )}
        <div className="nav-buttons">
          <NavLink className="header-cat" to="catalogue">
            Каталог
          </NavLink>
          {/* should lead to a random title */}
          <NavLink className="header-random" to="article/:random">
            Случайное
          </NavLink>
        </div>
        {/* user display depending on localStorage(maybe there is another way) */}
        {isAuthenticated ? (
          <Link className="header-profile" to={`${username}/profile`}>
            <span className="profile-name">{username}</span>
            <img className="profile-pic" alt="profile" src={DefaultIcon} />
          </Link>
        ) : (
          <div className="aunth-buttons">
            <NavLink to="sign-up">Зарагестрироваться</NavLink>
            <NavLink to="sign-in">Войти</NavLink>
          </div>
        )}
      </header>
    </>
  );
}
export default Header;
