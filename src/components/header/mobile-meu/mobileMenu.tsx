import React from "react";
import "./mobileMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { UserDto } from "../../../types/userDto";
import { useAuth } from "../../../hooks/useAuth";
import { toggleMenuAction } from "../../../redux/mobileSlcie";
import { MobileDto } from "../../../types/mobileDto";
import defaultPic from "../../img/Аватар.png";
// TODO переделать этот компонент полностью, мне не нравиться как он сделан
function MobileMenu() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMenuOpened,
  );
  const username = useSelector(
    (state: { auth: UserDto }) => state.auth.username,
  );

  return (
    <nav className={`mobile-menu-wrapper ${menuState ? "show" : "hide"}`}>
      <button
        className="header-mobile-button mobile-menu-open"
        type="button"
        onClick={() => dispatch(toggleMenuAction(!menuState))}
      >
        <div className="line-burger line-burger1" />
        <div className="line-burger line-burger2" />
      </button>
      {isAuthenticated ? (
        <div className="menu-user">
          <img src={defaultPic} alt="profile" className="menu-user-picture" />
          <span className="menu-user-name">{username}</span>
        </div>
      ) : (
        <div className="menu-user">
          <img src={defaultPic} alt="profile" className="menu-user-picture" />
          <span className="menu-user-name">
            <Link to="sign-in" className="menu-auth-link">
              Войти
            </Link>{" "}
            /
            <Link to="sign-up" className="menu-auth-link">
              {" "}
              Зарегестрироваться
            </Link>
          </span>
        </div>
      )}
      <div className="menu-navigation">
        <NavLink to="/" className="menu-navigation-button">
          Главная
        </NavLink>
        <NavLink to="catalogue" className="menu-navigation-button">
          Каталог
        </NavLink>
        <NavLink to="article/:random" className="menu-navigation-button">
          Случайное
        </NavLink>
        <NavLink to="about-us" className="menu-navigation-button">
          О нас
        </NavLink>
        <NavLink to="about-us" className="menu-navigation-button">
          Сообщить об ошибке
        </NavLink>
      </div>
    </nav>
  );
}
export default MobileMenu;
