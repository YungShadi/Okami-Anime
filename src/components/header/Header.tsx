import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import "./header.css";
import { UserDto } from "../../types/userDto";
import { MobileDto } from "../../types/mobileDto";
import Logo from "../img/icom.svg";
import DefaultIcon from "../img/user.svg";
import { useAuth } from "../../hooks/useAuth";
import { toggleMenuAction, toggleSearchAction } from "../../redux/mobileSlcie";
import search from "../img/search-frame.svg";
import ArrowUp from "../img/up-arrow-svgrepo-com.svg";

// header, navigation, user
function Header() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const headerRef = useRef(null);
  const [scrollIsEnough, setScrollIsEnough] = useState(0);
  const username = useSelector(
    (state: { auth: UserDto }) => state?.auth.username,
  );
  const searchState = useSelector(
    (state: { mobile: MobileDto }) => state?.mobile.isSearchOpened,
  );
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state?.mobile.isMenuOpened,
  );
  const mobileView = useSelector(
    (state: { mobile: MobileDto }) => state?.mobile.isMobileView,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const onScrollHandle = () => {
      const scrollYPos = window.scrollY;
      setScrollIsEnough(scrollYPos);
    };
    window.addEventListener("scroll", onScrollHandle);
    return () => window.removeEventListener("scroll", onScrollHandle);
  }, []);
  return (
    <>
      {/* // here we have nav links to change visible page */}
      <header
        className={`header ${scrollIsEnough > 75 ? "off-screen-fixed" : ""}`}
        ref={headerRef}
      >
        <button
          className="header-mobile-button mobile-menu-close"
          type="button"
          onClick={() => dispatch(toggleMenuAction(!menuState))}
        >
          <div className="line-burger line-burger1" />
          <div className="line-burger line-burger2" />
          <div className="line-burger line-burger3" />
        </button>
        <Link className="logo" to="/">
          <div className="img-background">
            <img className="logo-img" alt="log" src={Logo} />
          </div>
          <span className="logo-title">ŌkamiAnime</span>
        </Link>
        {location.pathname === "/catalogue" ? (
          <button
            type="button"
            className="header-mobile-button mobile-search incative"
            disabled
          >
            <img src={search} alt="search" />
          </button>
        ) : (
          <button
            type="button"
            className="header-mobile-button mobile-search"
            onClick={() => dispatch(toggleSearchAction(!searchState))}
          >
            <img src={search} alt="search" />
          </button>
        )}
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
          <Link className="header-profile" to={`profile/${username}`}>
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
      {searchState && mobileView && (
        <input className="mobile-header-search" placeholder="Поиск" />
      )}
      {scrollIsEnough > 90 &&
        !mobileView &&
        createPortal(
          <div className="up-button-wrap">
            <button
              className="up-button"
              type="button"
              onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
            >
              <img src={ArrowUp} alt="arrow-up" className="up-button-arrow" />
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
export default Header;
