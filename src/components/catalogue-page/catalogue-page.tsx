/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { paginationState } from "../../redux/paginationSlice";
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
  const titlesArray = useSelector(
    (state: { pagination: paginationState }) => state.pagination.titlesArray,
  );

  // const [yearsFilter, setYearsFilter] = useState([1977, 2023]);
  const location = useLocation();
  // ! get params from url
  // ! need to undestand hwo this works
  const currentPage = new URLSearchParams(location.search).get("page");
  console.log(currentPage);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if (menuState) {
        dispatch(toggleMenuAction(!menuState));
      }
    };
  });

  useEffect(() => {
    document.title = "Каталог";
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
          />
        </div>
        <div className="titles-wraper">
          {titlesArray.map((title) => (
            <Title
              titleName={title.titleName}
              titleAgeRest={title.titleAgeRest}
              titleStatus={title.titleStatus}
              titleTags={title.titleTags}
              titleClass=""
            />
          ))}
        </div>
        <Pagination
          totalCount={30}
          pageSize={1}
          siblingCount={1}
          currentPageCatalogue={Number(currentPage)}
        />
      </section>
    </div>
  );
}

export default CataloguePage;
