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
import Feedback from "../img/feedback.svg";
import DoorOut from "../img/doorOut.svg";

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
              <NavLink to="/">Главная страница</NavLink>
              <NavLink to="catalogue?page=1">Каталог</NavLink>
              <NavLink to="catalogue?page=1/top100">Топ 100</NavLink>
              <NavLink to="/profile">Профиль</NavLink>
              <NavLink to="/profile/lists">Списки</NavLink>
              <NavLink to="/profile/settings">Настройки</NavLink>
              <NavLink to="/some-random-link">Случайное аниме</NavLink>
              <div className="menu-buttons">
                <button type="button" className="menu-button">
                  <img
                    src={Feedback}
                    alt="feedback"
                    className="menu-button-img"
                  />
                  <span>Сообщить об ошибке</span>
                </button>
                <button type="button" className="menu-button">
                  <img
                    src={DoorOut}
                    alt="feedback"
                    className="menu-button-img"
                  />
                  <span>Выйти из аккаунта</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className={`mobile-close ${isMenuOpened ? "show" : "hide"}`}>
          <button
            type="button"
            onClick={handleMenuClose}
            className="mobile-close-button"
            id="#close-mobile"
          >
            <div className="palka" />
            <div className="palka second" />
          </button>
        </div>
        <div
          className={`background mobile-menu-background ${
            isMenuOpened ? "show" : "hide"
          }`}
          onClick={handleMenuClose}
        />
      </>,

      document.body,
    )
  );
}
export default MobileMenu;
