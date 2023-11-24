import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchAction } from "../../../redux/mobileSlcie";
import { useTitles } from "../../../hooks/useTitles";
import { TitleDto } from "../../../types/titleDto";
import useDebounce from "../../../hooks/useDebounce";
import search from "../../img/search-frame.svg";
import Title from "../../title";
import Lupa from "../../img/search.svg";
import { MobileDto } from "../../../types/mobileDto";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [isShearchShown, setIsSearchShown] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchHeigth, setSearchHeigth] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { handleSearchTitles, isSearchLoading } = useTitles();

  const searchState = useSelector(
    (state: { mobile: MobileDto }) => state?.mobile.isSearchOpened,
  );

  const debounceSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    if (debounceSearch && debounceSearch.length >= 2) {
      handleSearchTitles(debounceSearch, 0).then((result) => {
        if (result.data.content.length > 0)
          setSearchResult(result.data.content);
        else setSearchResult([]);
      });
    }
  }, [debounceSearch]);

  useEffect(() => {
    if (searchResult.length === 0) {
      setSearchHeigth(0);
    } else {
      const maxDisplayedResults = 5;
      const calculatedHeight =
        searchResult.length <= maxDisplayedResults
          ? searchResult.length * 125 + 50
          : maxDisplayedResults * 125 + 50;

      setSearchHeigth(calculatedHeight);
    }
  }, [searchResult.length]);

  const handleSearchBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsSearchShown(false);
    }
  };
  return (
    <>
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
            if (e.key === "Enter" && searchResult.length > 0)
              navigate(`/catalogue?page=1&search=${searchInput}`, {
                state: searchResult,
              });
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
          <button
            type="button"
            className="header-search-lupa"
            onClick={() => {
              if (searchResult.length > 0)
                navigate(`/catalogue?page=1&search=${searchInput}`, {
                  state: searchResult,
                });
            }}
          >
            <img src={Lupa} alt="" />
          </button>
          {!isSearchLoading && searchInput && searchResult.length > 0 && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              className="search-result-wraper"
              style={{
                height: searchHeigth > 0 ? searchHeigth : 0,
                opacity: searchHeigth > 0 ? 1 : 0,
              }}
            >
              {searchResult.slice(0, 5).map((title: TitleDto) => (
                <Title
                  titleClass="search-result-title"
                  titleData={title}
                  key={title.id}
                />
              ))}
              <button type="button" className="header-search-button">
                Показать еще {searchResult.length}
              </button>
            </div>
          )}
          {!isSearchLoading &&
            searchResult.length === 0 &&
            searchInput.length > 2 && (
              <div className="search-result-wraper unfiend">
                <span>Ничего не найдено по запросу: {debounceSearch}</span>
              </div>
            )}
          {isSearchLoading && (
            <div className="search-result-wraper unfiend">
              <span>Загрузка...</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
