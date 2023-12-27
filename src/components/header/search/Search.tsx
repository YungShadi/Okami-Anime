import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../../hooks/useDebounce";
import { toggleSearchAction } from "../../../redux/mobileSlcie";
import { useTitles } from "../../../hooks/useTitles";
import { TitleDto } from "../../../types/titleDto";
import { MobileDto } from "../../../types/mobileDto";
import Title from "../../title";
import Lupa from "../../img/search.svg";
import search from "../../img/search-frame.svg";

function SearchComponent() {
  const [searchInput, setSearchInput] = useState("");
  const [isShearchShown, setIsSearchShown] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchHeigth, setSearchHeigth] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { handleGetTitles, isTitlesLoadingLazy, titlesLoadStatus } =
    useTitles();

  const searchState = useSelector(
    (state: { mobile: MobileDto }) => state?.mobile.isSearchOpened,
  );

  const debounceSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    if (debounceSearch && debounceSearch.length >= 2) {
      handleGetTitles(0, debounceSearch).then((result) => {
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
  const onClickHandle = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.KeyboardEvent<HTMLDivElement>
        | React.FocusEvent<HTMLDivElement, Element>,
    ) => {
      if (searchInput) {
        navigate(
          `/catalogue?page=1${searchInput ? `&search=${searchInput}` : ""}`,
          {
            state: searchResult,
          },
        );
        setSearchInput("");
        handleSearchBlur(e as React.FocusEvent<HTMLDivElement, Element>);
        setSearchResult([]);
      }
    },
    [navigate, searchInput, searchResult],
  );

  const onAnimeClickHandle = useCallback(
    (e: React.FocusEvent<HTMLDivElement, Element>) => {
      setSearchInput("");
      handleSearchBlur(e);
      setSearchResult([]);
    },
    [],
  );

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
      {!location.pathname.includes("/catalogue") && (
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
            if (e.key === "Enter") onClickHandle(e);
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
            onClick={(e) => onClickHandle(e)}
          >
            <img src={Lupa} alt="" />
          </button>
          {!isTitlesLoadingLazy &&
            searchInput &&
            searchResult.length > 0 &&
            titlesLoadStatus === "fulfilled" && (
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
                    _onClickHandle={onAnimeClickHandle}
                  />
                ))}
                <button
                  type="button"
                  className="header-search-button"
                  onClick={(e) => onClickHandle(e)}
                >
                  Показать еще {searchResult.length}
                </button>
              </div>
            )}
          {titlesLoadStatus === "fulfilled" &&
            searchResult.length === 0 &&
            searchInput.length > 2 && (
              <div className="search-result-wraper unfiend">
                <span>Ничего не найдено по запросу: {debounceSearch}</span>
              </div>
            )}
          {titlesLoadStatus !== "fulfilled" &&
            titlesLoadStatus !== "uninitialized" && (
              <div className="search-result-wraper unfiend">
                <span>Загрузка...</span>
              </div>
            )}
        </div>
      )}
    </>
  );
}

// eslint-disable-next-line import/prefer-default-export
export const Search = React.memo(SearchComponent);
