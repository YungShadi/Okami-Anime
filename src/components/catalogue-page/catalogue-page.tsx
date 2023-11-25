/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { TitleDto } from "../../types/titleDto";
import { MobileDto } from "../../types/mobileDto";
import {
  toggleMenuAction,
  toggleFilterAction,
  toggleSearchAction,
} from "../../redux/mobileSlcie";
import { handleLinkTags } from "../../redux/filterSlice";
import { useTitles } from "../../hooks/useTitles";
import Search from "../img/search.svg";
import FiltersWrapper from "./Filter/FiltersWrapper";
import Pagination from "./Pagination/Pagination";
import Title from "../title";
import useDebounce from "../../hooks/useDebounce";

import "./catalogue-page.css";

function CataloguePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const linkState = location.state;
  // TODO может быть стоит создать отдельный стейт для хранения тайтло в каталоге
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
      state.titles.titlesArray,
  );
  const [totalElements, setTotalElements] = useState(18);

  const pageParams = new URLSearchParams(location.search);
  const currentPage = pageParams.get("page");
  const initialSearch = pageParams.get("search");
  const activeTags = pageParams.getAll("active_tags");
  const yearFrom = pageParams.get("from");
  const yearTo = pageParams.get("to");

  const { titlesLoadStatus, handleGetTitles } = useTitles();

  const [searchInput, setSearchInput] = useState("");
  const debounceSearch = useDebounce(searchInput, 500);

  if (!currentPage) {
    navigate("/catalogue?page=1");
  }

  if (searchState) {
    dispatch(toggleSearchAction(false));
  }

  const handlePageChangeCatalogue = (
    page: number,
    search: string | undefined,
    isLoadMore?: boolean,
  ) => {
    handleGetTitles(page, search, isLoadMore).then((res) =>
      setTotalElements(res.data.totalElements),
    );
  };

  // useEffect(() => {
  //   handleGetTitles(0, debounceSearch).then((res) =>
  //     setTotalElements(res.data.totalElements),
  //   );
  // }, [debounceSearch]);
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    document.title = "Каталог";
    if (initialSearch) setSearchInput(initialSearch);

    return () => {
      if (menuState) {
        dispatch(toggleMenuAction(!menuState));
      }
    };
  }, []);

  return (
    <div className="catalogue-page">
      {mobileView ? (
        filterStateMobile ? (
          createPortal(
            <FiltersWrapper
              searchInput={searchInput}
              yearFrom={yearFrom}
              yearTo={yearTo}
            />,
            document.body,
          )
        ) : (
          ""
        )
      ) : (
        <FiltersWrapper
          searchInput={searchInput}
          yearFrom={yearFrom}
          yearTo={yearTo}
        />
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
          {titlesLoadStatus === "fulfilled" &&
            titles.map((title: TitleDto) => (
              <Title
                titleClass="catalogue-page-title"
                titleData={title}
                key={title.id}
              />
            ))}
        </div>
        <Pagination
          totalCount={totalElements}
          pageSize={18}
          siblingCount={2}
          currentPageCatalogue={Number(currentPage)}
          pageParams={pageParams}
          handlePageChangeCatalogue={handlePageChangeCatalogue}
          search={searchInput || ""}
          yearFrom={yearFrom}
          yearTo={yearTo}
        />
      </section>
    </div>
  );
}

export default CataloguePage;
