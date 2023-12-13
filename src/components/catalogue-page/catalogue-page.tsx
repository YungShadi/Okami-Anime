/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { TitleDto } from "../../types/titleDto";
import { MobileDto } from "../../types/mobileDto";
import {
  toggleFilterAction,
  toggleSearchAction,
} from "../../redux/mobileSlcie";
import { useTitles } from "../../hooks/useTitles";
import Search from "../img/search.svg";
import FiltersWrapper from "./Filter/FiltersWrapper";
import Pagination from "./Pagination/Pagination";
import Title from "../title";
import SkeletonTitle from "../SkeletonTitle/SkeletonTitle";
import Metadata from "../Metadata";

import "./catalogue-page.css";

function CataloguePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  // const linkState = location.state;
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
  const [searchTitle, setSearchTitle] = useState("Каталог аниме");

  const pageParams = new URLSearchParams(location.search);
  const currentPage = pageParams.get("page");
  const initialSearch = pageParams.get("search");
  const yearFrom = pageParams.get("from");
  const yearTo = pageParams.get("to");

  const { titlesLoadStatus, handleGetTitles, isTitlesFetching } = useTitles();
  const [searchInput, setSearchInput] = useState("");

  if (searchState) {
    dispatch(toggleSearchAction(false));
  }
  if (!currentPage) {
    navigate(`${location.pathname}?page=1`);
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
    if (search) {
      handleGetTitles(page, search, isLoadMore).then((res) => {
        setTotalElements(res.data.totalElements);
        if (isLoadMore) {
          setIsLoadMoreAction(false);
          setPrevTitles([...prevTitles, ...res.data.content]);
        }
      });
    }
  };

  const handleSearchTitle = () => {
    if (pathname === "/catalogue/ongoing") setSearchTitle(`Онгоинги`);
    if (pathname === "/catalogue/top") setSearchTitle("Топ 100 тайтлов");
    if (pathname === "/catalogue/announcement") setSearchTitle("Анонсы");
  };

  const handleSearch = async (search: string) => {
    if (isTitlesFetching) return;
    const trimmedSearch = search.trim();
    handleGetTitles(0, trimmedSearch ?? "", false).then((res) => {
      setTotalElements(res.data.totalElements);
      if (trimmedSearch) {
        setSearchTitle(`Поиск по запросу: ${trimmedSearch}`);
      } else if (!trimmedSearch) {
        setSearchTitle("Катало аниме");
      }
      navigate(`/catalogue?page=1&search=${trimmedSearch}`);
    });
  };

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    if (initialSearch) {
      setSearchInput(initialSearch);
      handleGetTitles(0, initialSearch, false).then((res) => {
        setTotalElements(res.data.totalElements);
        setSearchTitle(`Поиск по запросу: ${initialSearch}`);
      });
    }
    handleGetTitles(0, "", false).then((res) => {
      setTotalElements(res.data.totalElements);
      setSearchTitle(`Каталог аниме`);
    });
  }, []);

  useEffect(() => {
    handleSearchTitle();
  }, [location.pathname]);

  useEffect(() => {
    setPrevTitles([...titles]);
    if (titles.length > 0) setIsLoadMoreAction(false);
  }, [titles]);

  let titlesJsx;
  if (titles.length > 0) {
    titlesJsx = (
      <div className="titles-wraper">
        {titlesLoadStatus === "fulfilled" ? (
          titles.map((title: TitleDto) => (
            <Title
              titleClass="catalogue-page-title"
              titleData={title}
              key={title.id}
              _onClickHandle={() => console.log(1)}
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
                  _onClickHandle={() => console.log(1)}
                />
              ))}
            {Array.from({ length: 18 }, (_, index) => (
              <SkeletonTitle key={index} />
            ))}
          </>
        )}
      </div>
    );
  } else {
    titlesJsx = (
      <div className="titles-wraper">
        <p>Не найдено</p>
      </div>
    );
  }

  return (
    <>
      <Metadata
        title="Каталог"
        description="Ваш источник увлекательных аниме! Смотрите бесплатно лучшие аниме онлайн на нашем сайте. Огромная коллекция анимационных шедевров!."
        url={window.location.href}
      />
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
          <Pagination
            totalCount={totalElements}
            pageSize={18}
            siblingCount={mobileView ? 1 : 2}
            currentPageCatalogue={Number(currentPage)}
            pageParams={pageParams}
            handlePageChangeCatalogue={handlePageChangeCatalogue}
            search={searchInput || ""}
            isLoadMoreButton={false}
          />
          <h2 className="wraper-title">{searchTitle}</h2>
          {titlesJsx}
          <Pagination
            totalCount={totalElements}
            pageSize={18}
            siblingCount={mobileView ? 1 : 2}
            currentPageCatalogue={Number(currentPage)}
            pageParams={pageParams}
            handlePageChangeCatalogue={handlePageChangeCatalogue}
            search={searchInput || ""}
            isLoadMoreButton
          />
        </section>
      </div>
    </>
  );
}

export default CataloguePage;
