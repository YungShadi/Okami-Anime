import React, { Suspense, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import Search from "./search/Search";
import { UserDto } from "../../types/userDto";
import { MobileDto } from "../../types/mobileDto";
import { useAuth } from "../../hooks/useAuth";
import { toggleMenuAction } from "../../redux/mobileSlcie";
import ArrowUp from "../img/up-arrow-svgrepo-com.svg";
import Logo from "../img/icom.svg";
import DefaultIcon from "../img/user.svg";

import "./header.css";

// header, navigation, user
function Header() {
  const { isAuthenticated } = useAuth();
  const headerRef = useRef(null);
  const [scrollIsEnough, setScrollIsEnough] = useState(0);
  const [randomLink, setRandomLink] = useState("");
  const [isDropdownShown, setIsDropDownShown] = useState(false);
  const [isUpButtonVisible, setIsUpButtonVisible] = useState(false);

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

  const onScrollHandle = () => {
    const scrollYPos = window.scrollY;
    setScrollIsEnough(scrollYPos);
    if (scrollYPos < 90) setIsUpButtonVisible(false);
    else setIsUpButtonVisible(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollHandle);
    return () => window.removeEventListener("scroll", onScrollHandle);
  }, [scrollIsEnough]);

  const randomTitleHandle = () => {
    setRandomLink(
      "etot-glupyy-svin-ne-ponimaet-mechtu-devochkizayki?serial-54507",
    );
  };

  const handleTopScroll = () => {
    setTimeout(() => {
      window.scrollTo({ behavior: "smooth", top: 0 });
    }, 100);
  };

  return (
    <>
      {/* // here we have nav links to change visible page */}
      <header
        className={`header ${scrollIsEnough > 75 ? "off-screen-fixed" : ""}`}
        ref={headerRef}
      >
        <div className="header-wrpaer">
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
          <Suspense>
            <Search />
          </Suspense>
          <div className="nav-buttons">
            {/* should lead to a random title */}
            <NavLink
              className="header-random"
              onClick={() => randomTitleHandle()}
              to={`article/${randomLink}`}
            >
              Случайное
            </NavLink>
            <div
              className="catalogue-options-wraper"
              onMouseEnter={() => setIsDropDownShown(true)}
              onMouseLeave={() => setIsDropDownShown(false)}
            >
              <button type="button" className="catalogue-button">
                Каталог
              </button>
              <ul
                className={`catalogue-options ${
                  isDropdownShown ? "show" : "hide"
                }`}
              >
                <div className="dropdown-arrow" />
                <div className="dropdown-arrow2" />
                <li className="catalogue-option">
                  <NavLink to="/catalogue?page=1" end>
                    Каталог аниме
                  </NavLink>
                </li>
                <li className="catalogue-option">
                  <NavLink to="/catalogue/top?page=1" end>
                    Топ 100
                  </NavLink>
                </li>
                <li className="catalogue-option">
                  <NavLink to="/catalogue/ongoing?page=1" end>
                    Онгоинги
                  </NavLink>
                </li>
                <li className="catalogue-option">
                  <NavLink to="/catalogue/announcement?page=1" end>
                    Анонсы
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          {isAuthenticated ? (
            <Link className="header-profile" to={`profile/${username}`}>
              <span className="profile-name">{username}</span>
              <img className="profile-pic" alt="profile" src={DefaultIcon} />
            </Link>
          ) : (
            <div className="aunth-buttons">
              <NavLink to="sign-up">Зарегестрироваться</NavLink>
              <NavLink to="sign-in">Войти</NavLink>
            </div>
          )}
        </div>
      </header>
      {searchState && mobileView && (
        <input className="mobile-header-search" placeholder="Поиск" />
      )}
      {!mobileView &&
        createPortal(
          <div className="up-button-wrap">
            <button
              className={`up-button ${isUpButtonVisible ? "" : "anim"}`}
              type="button"
              onClick={handleTopScroll}
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
