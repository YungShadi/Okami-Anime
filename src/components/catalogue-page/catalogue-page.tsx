/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { createPortal } from "react-dom";
import { TitleDto } from "../../types/titleDto";
import { MobileDto } from "../../types/mobileDto";
import {
  toggleMenuAction,
  toggleFilterAction,
  toggleSearchAction,
} from "../../redux/mobileSlcie";
import { useTitles } from "../../hooks/useTitles";
import Search from "../img/search.svg";
import FiltersWrapper from "./Filter/FiltersWrapper";
import Pagination from "./Pagination/Pagination";
import Title from "../title";
// import useDebounce from "../../hooks/useDebounce";

import "react-loading-skeleton/dist/skeleton.css";
import "./catalogue-page.css";

function SkeletonTitle() {
  return (
    <SkeletonTheme baseColor="#05315A" highlightColor="#0C4281">
      <div className="catalogue-page-title title-main skeleton-title">
        <div className="title-poster-wraper">
          <div className="title-poster poster">
            <Skeleton width={190} height={300} />
          </div>
        </div>
        <div className="title-name-tags">
          <span className="title-name name">
            <Skeleton width={190} />
          </span>
          <span className="title-episodes">
            <Skeleton width={100} />
          </span>
          <div className="title-tags tags">
            <Skeleton width={190} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

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
  const [prevTitles, setPrevTitles] = useState([]);
  const [totalElements, setTotalElements] = useState(18);
  const [isLoadMoreAction, setIsLoadMoreAction] = useState(true);

  const pageParams = new URLSearchParams(location.search);
  const currentPage = pageParams.get("page");
  const initialSearch = pageParams.get("search");
  const yearFrom = pageParams.get("from");
  const yearTo = pageParams.get("to");

  const { titlesLoadStatus, handleGetTitles } = useTitles();

  const [searchInput, setSearchInput] = useState("");
  // const debounceSearch = useDebounce(searchInput, 500);

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
    if (isLoadMore) setIsLoadMoreAction(true);
    handleGetTitles(page, search, isLoadMore).then((res) => {
      setTotalElements(res.data.totalElements);
      if (isLoadMore) {
        setIsLoadMoreAction(false);
        setPrevTitles([...prevTitles, ...res.data.content]);
      }
    });
  };
  // TODO как сделать поиск пока не оч прозрачно
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

  useEffect(() => {
    setPrevTitles([...titles]);
    if (titles.length > 0) setIsLoadMoreAction(false);
  }, [titles]);

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
          {titlesLoadStatus === "fulfilled" ? (
            titles.map((title: TitleDto) => (
              <Title
                titleClass="catalogue-page-title"
                titleData={title}
                key={title.id}
              />
            ))
          ) : (
            <>
              {isLoadMoreAction &&
                prevTitles.map((title: TitleDto) => (
                  <Title
                    titleClass="catalogue-page-title"
                    titleData={title}
                    key={title.id}
                  />
                ))}
              {Array.from({ length: 18 }, (_, index) => (
                <SkeletonTitle key={index} />
              ))}
            </>
          )}
        </div>
        <Pagination
          totalCount={totalElements}
          pageSize={18}
          siblingCount={2}
          currentPageCatalogue={Number(currentPage)}
          pageParams={pageParams}
          handlePageChangeCatalogue={handlePageChangeCatalogue}
          search={searchInput || ""}
        />
      </section>
    </div>
  );
}

export default CataloguePage;
