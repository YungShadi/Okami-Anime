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
import { useTitles } from "../../hooks/useTitles";
import Search from "../img/search.svg";
import FiltersWrapper from "./Filter/FiltersWrapper";
import Pagination from "./Pagination/Pagination";
import Title from "../title";
import SkeletonTitle from "../SkeletonTitle/SkeletonTitle";

import "./catalogue-page.css";

function CataloguePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const linkState = location.state;
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
  const [prevTitles, setPrevTitles] = useState<TitleDto[]>([]);
  const [totalElements, setTotalElements] = useState(18);
  const [isLoadMoreAction, setIsLoadMoreAction] = useState(true);

  const pageParams = new URLSearchParams(location.search);
  const currentPage = pageParams.get("page");
  const initialSearch = pageParams.get("search");
  const yearFrom = pageParams.get("from");
  const yearTo = pageParams.get("to");

  const { titlesLoadStatus, handleGetTitles } = useTitles();
  const [searchInput, setSearchInput] = useState("");

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
    if (isLoadMore) {
      setIsLoadMoreAction(true);
    } else {
      window.scrollTo(0, 0);
    }
    handleGetTitles(page, search, isLoadMore).then((res) => {
      setTotalElements(res.data.totalElements);
      if (isLoadMore) {
        setIsLoadMoreAction(false);
        setPrevTitles([...prevTitles, ...res.data.content]);
      }
    });
  };

  const handleSearch = (search: string) => {
    handleGetTitles(0, search, false).then((res) => {
      setTotalElements(res.data.totalElements);
      navigate(`/catalogue?page=1&search=${search}`);
    });
  };

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    document.title = "Каталог";
    if (initialSearch) {
      setSearchInput(initialSearch);
      handleSearch(initialSearch);
    }
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
          <input
            type="text"
            placeholder="Поиск"
            className="input-title"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(searchInput);
            }}
          />
          <button
            type="button"
            className="catalogue-search-button"
            onClick={() => handleSearch(searchInput)}
          >
            <img src={Search} alt="s-lupa" />
          </button>
        </div>
        <div className="titles-wraper">
          {titlesLoadStatus === "fulfilled" ? (
            titles.map((title: TitleDto) => (
              <Title
                titleClass="catalogue-page-title"
                titleData={title}
                key={title.id}
                onClickHandle={() => console.log(1)}
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
                    onClickHandle={() => console.log(1)}
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
