import React from "react";
import "./mobileMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuAction } from "../../../redux/mobileSlcie";
import { MobileDto } from "../../../types/mobileDto";

function MobileMenu() {
  const dispatch = useDispatch();
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMenuOpened
  );

  return (
    <nav className={`mobile-menu-wrapper ${menuState ? "show" : "hide"}`}>
      <button
        type="button"
        className="close-menu-button"
        onClick={() => dispatch(toggleMenuAction(!menuState))}
      >
        <div className="line-burger line-burger1" />
        <div className="line-burger line-burger2" />
      </button>
      <div className="menu-user">
        <img src="" alt="profile" className="menu-user-picture" />
        <span className="menu-user-name">useranme</span>
      </div>
      <div className="menu-navigation">
        <button type="button">Каталог</button>
        <button type="button">Случайное</button>
        <button type="button">sad</button>
      </div>
    </nav>
  );
}
export default MobileMenu;
