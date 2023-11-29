import React from "react";
import "./mobileMenu.css";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, NavLink } from "react-router-dom";
// import { UserDto } from "../../../types/userDto";
// import { useAuth } from "../../../hooks/useAuth";
// import { toggleMenuAction } from "../../../redux/mobileSlcie";
import { MobileDto } from "../../../types/mobileDto";
// import defaultPic from "../../img/Аватар.png";

// TODO переделать этот компонент полностью, мне не нравиться как он сделан
function MobileMenu() {
  // const dispatch = useDispatch();
  // const { isAuthenticated } = useAuth();
  // const menuState = useSelector(
  //   (state: { mobile: MobileDto }) => state.mobile.isMenuOpened,
  // );
  // const username = useSelector(
  //   (state: { auth: UserDto }) => state.auth.username,
  // );

  return (
    <nav className={`mobile-menu-wrapper ${menuState ? "show" : "hide"}`}>
      a
    </nav>
  );
}
export default MobileMenu;
