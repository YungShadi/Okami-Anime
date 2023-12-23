/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toggleMenuAction } from "../../redux/mobileSlcie";
import { MobileDto } from "../../types/mobileDto";
import { UserDto } from "../../types/userDto";
import DefaultPic from "../img/Аватар.png";
import Feedback from "../img/feedback.svg";
import DoorOut from "../img/doorOut.svg";

import "./mobileMenu.scss";

// [x] переделать этот компонент полностью, мне не нравиться как он сделан
function MobileMenu() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, logout } = useAuth();
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMenuOpened,
  );
  const username = useSelector(
    (state: { auth: UserDto }) => state.auth.username,
  );
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
              {isAuthenticated && (
                <NavLink to="/profile" onClick={handleMenuClose}>
                  <img
                    src={DefaultPic}
                    alt="profile pic"
                    className="menu-profile-pic"
                  />
                  <h2 className="menu-username">{username}</h2>
                </NavLink>
              )}
              {!isAuthenticated && (
                <>
                  <h2>Вход в аккаунт не выпонен</h2>
                  <span>Вы можете</span>
                  <NavLink
                    onClick={handleMenuClose}
                    to="/sign-in"
                    className="menu-link"
                  >
                    Войти
                  </NavLink>
                  <span>или</span>
                  <NavLink
                    onClick={handleMenuClose}
                    to="sign-up"
                    className="menu-link"
                  >
                    Зарегестрироваться
                  </NavLink>
                </>
              )}
            </div>
            <div className="menu-navigation">
              <NavLink onClick={handleMenuClose} to="/" className="menu-link">
                Главная страница
              </NavLink>
              <NavLink
                onClick={handleMenuClose}
                to="catalogue?page=1"
                className="menu-link"
              >
                Каталог
              </NavLink>
              <NavLink
                onClick={handleMenuClose}
                to="catalogue?page=1/top100"
                className="menu-link"
              >
                Топ 100
              </NavLink>
              <NavLink
                onClick={handleMenuClose}
                to="/profile"
                className="menu-link"
              >
                Профиль
              </NavLink>
              <NavLink
                onClick={handleMenuClose}
                to="/profile/lists"
                className="menu-link"
              >
                Списки
              </NavLink>
              <NavLink
                onClick={handleMenuClose}
                to="/profile/settings"
                className="menu-link"
              >
                Настройки
              </NavLink>
              <NavLink
                onClick={handleMenuClose}
                to="/some-random-link"
                className="menu-link"
              >
                Случайное аниме
              </NavLink>
              <div className="menu-buttons">
                <button type="button" className="menu-button">
                  <img
                    src={Feedback}
                    alt="feedback"
                    className="menu-button-img"
                  />
                  <span>Сообщить об ошибке</span>
                </button>
                {isAuthenticated && (
                  <button
                    type="button"
                    className="menu-button"
                    onClick={logout}
                  >
                    <img
                      src={DoorOut}
                      alt="feedback"
                      className="menu-button-img"
                    />
                    <span>Выйти из аккаунта</span>
                  </button>
                )}
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
