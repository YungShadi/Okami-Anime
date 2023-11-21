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
  const { handleSearchTitle } = useTitles();

  const searchState = useSelector(
    (state: { mobile: MobileDto }) => state?.mobile.isSearchOpened,
  );

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
    </>
  );
}
