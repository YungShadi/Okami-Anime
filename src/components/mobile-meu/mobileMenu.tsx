/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { UserDto } from "../../../types/userDto";
// import { useAuth } from "../../../hooks/useAuth";
import { toggleMenuAction } from "../../redux/mobileSlcie";
import { MobileDto } from "../../types/mobileDto";
import DefaultPic from "../img/Аватар.png";
import Logo from "../img/icom.svg";

import "./mobileMenu.css";

// TODO переделать этот компонент полностью, мне не нравиться как он сделан
function MobileMenu() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const dispatch = useDispatch();
  // const { isAuthenticated } = useAuth();
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMenuOpened,
  );
  // const username = useSelector(
  //   (state: { auth: UserDto }) => state.auth.username,
  // );
  useLayoutEffect(() => {
    setIsMenuOpened(menuState);
  }, [menuState]);

  const handleMenuClose = () => {
    setIsMenuOpened(false);
    setTimeout(() => dispatch(toggleMenuAction(false)), 500);
  };

  return (
    menuState &&
    createPortal(
      <>
        <nav className={`mobile-menu-wraper ${isMenuOpened ? "show" : "hide"}`}>
          <div className="mobile-menu">
            <div className="menu-profile">
              <img src={DefaultPic} alt="profile pic" />
              <span className="menu-username">loh</span>
            </div>
            <div className="menu-navigation">
              <NavLink to="/">
                <img
                  src={Logo}
                  alt="logo"
                  style={{ filter: "invert(1)" }}
                  className="menu-logo"
                />
                Главная страница
              </NavLink>
              <NavLink to="/">Профиль</NavLink>
              <NavLink to="catalogue?page=1">Каталог</NavLink>
              <NavLink to="catalogue?page=1">Топ 100</NavLink>
              <NavLink to="/">Списки</NavLink>
              <NavLink to="/">Случайное аниме</NavLink>
              <NavLink to="catalogue?page=1">Сообщить об ошибке</NavLink>
            </div>
          </div>
        </nav>
        <div
          className={`background mobile-menu-background ${
            isMenuOpened ? "show" : "hide"
          }`}
          onClick={handleMenuClose}
        >
          <button type="button">close</button>
        </div>
      </>,

      document.body,
    )
  );
}
export default MobileMenu;
