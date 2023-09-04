import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import Logo from "../img/icom.svg";
import DefaultIcon from "../img/user.svg";

// header, navigation, user
function Header() {
  // const [user, setUser] = useState(false);

  return (
    // here we have nav links to change visible page
    <header className="header">
      <button className="header-mobile-menu" type="button">
        menu
      </button>
      <NavLink className="logo" to="/">
        <div className="img-background">
          <img className="logo-img" alt="log" src={Logo} />
        </div>
        <span className="logo-title">ŌkamiAnime</span>
      </NavLink>
      <input type="text" placeholder="Поиск" className="input-title" />
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
      {true && (
        <Link className="header-profile" to="profile">
          <span className="profile-name">AnalDestroyer</span>
          <img className="profile-pic" alt="profile" src={DefaultIcon} />
        </Link>
      )}
      {!true && (
        <div className="aunth-buttons">
          <NavLink to="sign-up">Зарагестрироваться</NavLink>
          <NavLink to="sign-in">Войти</NavLink>
        </div>
      )}
    </header>
  );
}
export default Header;
