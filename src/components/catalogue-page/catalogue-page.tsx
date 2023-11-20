/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { TitleDto } from "../../types/titleDto";
import { MobileDto } from "../../types/mobileDto";

import {
  toggleMenuAction,
  toggleFilterAction,
  toggleSearchAction,
} from "../../redux/mobileSlcie";

import Search from "../img/search.svg";
import FiltersWrapper from "./Filter/FiltersWrapper";
import Pagination from "./Pagination/Pagination";
import Title from "../title";

import "./catalogue-page.css";

function CataloguePage() {
  const dispatch = useDispatch();
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMenuOpened,
  );
  const filterStateMobile = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isFilterOpened,
  );
  const mobileView = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMobileView,
  );
  const searchState = useSelector(
    (state: { mobile: MobileDto }) => state?.mobile.isSearchOpened,
  );
  const titles = useSelector(
    (state: { titles: { titlesArray: TitleDto[] } }) =>
      state?.titles.titlesArray,
  );
  const [searchInput, setSearchInput] = useState("");

  // const [yearsFilter, setYearsFilter] = useState([1977, 2023]);
  const location = useLocation();

  const pageParams = new URLSearchParams(location.search);
  const currentPage = pageParams.get("page");
  const initialSearch = pageParams.get("search");

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if (menuState) {
        dispatch(toggleMenuAction(!menuState));
      }
    };
  }, []);

  useEffect(() => {
    document.title = "Каталог";
    if (initialSearch) setSearchInput(initialSearch);
  }, []);

  if (searchState) {
    dispatch(toggleSearchAction(false));
  }
  return (
    <div className="catalogue-page">
      {mobileView ? (
        filterStateMobile ? (
          createPortal(<FiltersWrapper />, document.body)
        ) : (
          ""
        )
      ) : (
        <FiltersWrapper />
      )}
      <button
        type="button"
        className="mobile-button-filter"
        onClick={() => dispatch(toggleFilterAction(!filterStateMobile))}
      >
        Открыть фильтр
      </button>
      <section className="search-and-titles">
        <div className="catalogue-search">
          <img src={Search} alt="s-lupa" />
          <input
            type="text"
            placeholder="Поиск"
            className="input-title"
            style={{ marginLeft: "20px" }}
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </div>
        <div className="titles-wraper">
          {titles.map((title: TitleDto) => (
            <Title
              titleClass="catalogue-page-title"
              titleFullName={title.title}
              titleName={title.material_data.title || title.title}
              titleAgeRest={title.material_data.rating_mpaa}
              titleStatus={title.material_data.anime_status}
              titleTags={title.material_data.anime_genres}
              titlePoster={title.material_data.poster_url}
              titleEpisodes={title.episodes_count}
              titleId={title.id}
              titleType={title.type}
            />
          ))}
        </div>
        <Pagination
          totalCount={30}
          pageSize={1}
          siblingCount={1}
          currentPageCatalogue={Number(currentPage)}
          pageParams={pageParams}
        />
      </section>
    </div>
  );
}

export default CataloguePage;
