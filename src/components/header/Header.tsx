import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { UserDto } from "../../types/userDto";
import { MobileDto } from "../../types/mobileDto";
import { useAuth } from "../../hooks/useAuth";
import { useTitles } from "../../hooks/useTitles";
import { TitleDto } from "../../types/titleDto";
import { toggleMenuAction, toggleSearchAction } from "../../redux/mobileSlcie";
import useDebounce from "../../hooks/useDebounce";
import search from "../img/search-frame.svg";
import ArrowUp from "../img/up-arrow-svgrepo-com.svg";
import Title from "../title";
import Logo from "../img/icom.svg";
import DefaultIcon from "../img/user.svg";
import Lupa from "../img/search.svg";

import "./header.css";

// header, navigation, user
function Header() {
  const { isAuthenticated } = useAuth();
  const { handleSearchTitle } = useTitles();
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [scrollIsEnough, setScrollIsEnough] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [isShearchShown, setIsSearchShown] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [randomLink, setRandomLink] = useState("");
  const [searchHeigth, setSearchHeigth] = useState(0);

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

  const randomTitleHandle = () => {
    setRandomLink(
      "etot-glupyy-svin-ne-ponimaet-mechtu-devochkizayki?serial-54507",
    );
  };
  const debounceSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    handleSearchTitle(debounceSearch).then((result) => {
      setSearchResult(result.data.results);
    });
  }, [debounceSearch]);

  useEffect(() => {
    if (searchResult.length === 0) {
      setSearchHeigth(0);
    } else {
      const maxDisplayedResults = 5; // You may customize this value
      const calculatedHeight =
        searchResult.length <= maxDisplayedResults
          ? searchResult.length * 125 + 50
          : maxDisplayedResults * 125 + 50;

      setSearchHeigth(calculatedHeight);
    }
  }, [searchResult.length]);

  const handleSearchBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsSearchShown(false);
  };

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
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            className={`search-wraper ${isShearchShown ? "show" : "hide"}`}
            onFocus={() => {
              setIsSearchShown(true);
            }}
            onBlur={(e) => {
              handleSearchBlur(e);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                navigate(`/catalogue?page=1&search=${searchInput}`);
            }}
          >
            <input
              type="text"
              placeholder="Поиск"
              className="input-title"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <button type="button" className="header-search-lupa">
              <img src={Lupa} alt="" />
            </button>
            {searchInput && searchResult.length > 0 && (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                className="search-result-wraper"
                onClick={() => {
                  setSearchInput("");
                  setSearchResult([]);
                }}
                style={{
                  height: searchHeigth > 0 ? searchHeigth : 0,
                  opacity: searchHeigth > 0 ? 1 : 0,
                }}
              >
                {searchResult.slice(0, 5).map((title: TitleDto) => (
                  <Title
                    titleClass="search-result-title"
                    titleFullName={title.title}
                    titleName={title.material_data.title}
                    titleAgeRest={title.material_data.rating_mpaa}
                    titleStatus={title.material_data.anime_status}
                    titleTags={title.material_data.anime_genres}
                    titlePoster={title.material_data.poster_url}
                    titleEpisodes={title.episodes_count}
                    titleId={title.id}
                    titleType={title.type}
                  />
                ))}
                <button type="button" className="header-search-button">
                  Показать еще {searchResult.length}
                </button>
              </div>
            )}
            {searchInput && searchResult.length === 0 && (
              <div className="search-result-wraper unfiend">
                <span>Ничего не найдено по вашему запросу</span>
              </div>
            )}
          </div>
        )}
        <div className="nav-buttons">
          <NavLink
            className="header-cat"
            to={{
              pathname: "/catalogue",
              search: "?page=1",
            }}
            reloadDocument={location.pathname === "/catalogue"}
          >
            Каталог
          </NavLink>
          {/* should lead to a random title */}
          <NavLink
            className="header-random"
            onClick={() => randomTitleHandle()}
            to={`article/${randomLink}`}
          >
            Случайное
          </NavLink>
        </div>
        {/* user display depending on localStorage(maybe there is another way) */}
        {!isAuthenticated ? (
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
