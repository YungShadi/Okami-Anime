/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactSlider from "react-slider";
import { createPortal } from "react-dom";
import { toggleFilterAction } from "../../../redux/mobileSlcie";
import Filter from "./Filter";
import { MobileDto } from "../../../types/mobileDto";
import CloseCross from "../../img/close-cross.svg";
import "../catalogue-page.css";

function FilterWrapper() {
  const filterStateMobile = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isFilterOpened,
  );
  const mobileView = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMobileView,
  );
  const [tagFilterExpand, setTagFilterExpand] = useState(false);
  const [typeFilterExpand, setTypeFilterExpand] = useState(false);
  const [statusFilterExpand, setStatusFilterExpand] = useState(false);
  const [tagArray /* setTagArray */] = useState([
    {
      title: "Сёнэн",
      value: "senen",
      status: "inactive",
    },
    {
      title: "Сёдзё",
      value: "sedze",
      status: "inactive",
    },
    {
      title: "Сэйнэн",
      value: "seynen",
      status: "inactive",
    },
    {
      title: "Боевик",
      value: "action",
      status: "inactive",
    },
    {
      title: "Детектив",
      value: "detactive",
      status: "inactive",
    },
    {
      title: "Драма",
      value: "drama",
      status: "inactive",
    },
    {
      title: "Киберпанк",
      value: "cyberpunk",
      status: "inactive",
    },
    {
      title: "Комедия",
      value: "comedy",
      status: "inactive",
    },
    {
      title: "Ме́ха",
      value: "mecha",
      status: "inactive",
    },
    {
      title: "Повседневность",
      value: "dayly",
      status: "inactive",
    },
    {
      title: "Психологический триллер",
      value: "psy-triller",
      status: "inactive",
    },
    {
      title: "Исэкай",
      value: "isecay",
      status: "inactive",
    },
    {
      title: "Романтика",
      value: "romantic",
      status: "inactive",
    },
    {
      title: "Фэнтези",
      value: "fantasy",
      status: "inactive",
    },
    {
      title: "Боевые искусства",
      value: "fight-art",
      status: "inactive",
    },
    {
      title: "Военное",
      value: "war",
      status: "inactive",
    },
    {
      title: "Гарем",
      value: "garem",
      status: "inactive",
    },
    {
      title: "Игры",
      value: "games",
      status: "inactive",
    },
    {
      title: "Исторический",
      value: "historical",
      status: "inactive",
    },
    {
      title: "Магия",
      value: "magic",
      status: "inactive",
    },
    {
      title: "Спорт",
      value: "sport",
      status: "inactive",
    },
    {
      title: "Триллер",
      value: "triller",
      status: "inactive",
    },
    {
      title: "Ужасы",
      value: "horror",
      status: "inactive",
    },
    {
      title: "Школа",
      value: "school",
      status: "inactive",
    },
  ]);
  const [typeArray /* setTypeArray */] = useState([
    {
      title: "Сериал",
      value: "serial",
      status: "inactive",
    },
    {
      title: "Полнометражный фильм",
      value: "long-film",
      status: "inactive",
    },
    {
      title: "Короткометражка",
      value: "short-film",
      status: "inactive",
    },
    {
      title: "ONA",
      value: "ona",
      status: "inactive",
    },
    {
      title: "OVA",
      value: "ova",
      status: "inactive",
    },
    {
      title: "Спэшл",
      value: "special",
      status: "inactive",
    },
  ]);
  const [statusArray /* setStatusArray */] = useState([
    {
      title: "Вышел",
      value: "out",
      status: "inactive",
    },
    {
      title: "Онгоинг",
      value: "ongoing",
      status: "inactive",
    },
    {
      title: "Анонс",
      value: "announcement",
      status: "inactive",
    },
  ]);
  const dispatch = useDispatch();

  if (mobileView) {
    return createPortal(
      <>
        <aside
          className={`filters-wraper ${filterStateMobile ? "open" : "closed"}`}
        >
          <div className="filter-header">
            <h3>Фильтр аниме</h3>
            <button
              type="button"
              className="close-mobile-filter"
              onClick={() => {
                dispatch(toggleFilterAction(false));
              }}
            >
              <img src={CloseCross} alt="close" />
            </button>
          </div>
          <div className="filter-slider-wraper">
            <div className="slider-line" />
            <ReactSlider
              className="filter-slider"
              thumbClassName="slider-thumb"
              trackClassName="slider-track"
              defaultValue={[1977, 2023]}
              renderThumb={(props, state) => (
                <div {...props}>
                  <span className="thumb-content">{state.valueNow}</span>
                </div>
              )}
              min={1977}
              max={2023}
              ariaValuetext=""
              // onChange={(years) => setYearsFilter(years)}
            />
            <div className="slider-pips">
              <div className="pip-horisontal big" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal big" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal big" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal big" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal" />
              <div className="pip-horisontal big" />
            </div>
          </div>
          <div className="filters">
            <Filter
              filterName="Жанры"
              filterArray={tagArray}
              filterValue="genre"
              filterDesc="Выберите жанры"
              filterState={tagFilterExpand}
              filterZIndex={500}
              filterSearch
              filterStateSet={setTagFilterExpand}
              filterHeight={300}
            />
            <Filter
              filterName="Типы"
              filterArray={typeArray}
              filterValue="type"
              filterDesc="Выберите тип"
              filterState={typeFilterExpand}
              filterZIndex={400}
              filterSearch={false}
              filterStateSet={setTypeFilterExpand}
              filterHeight={200}
            />
            <Filter
              filterName="Статус"
              filterArray={statusArray}
              filterValue="status"
              filterDesc="Выберите статус"
              filterState={statusFilterExpand}
              filterZIndex={300}
              filterSearch={false}
              filterStateSet={setStatusFilterExpand}
              filterHeight={100}
            />
          </div>
          <div className="filter-button-wraper">
            <button className="filter-button" type="button">
              Искать
            </button>
          </div>
        </aside>
        <div
          className="background"
          onClick={() => dispatch(toggleFilterAction(false))}
        />
      </>,
      document.body,
    );
  }
  return (
    <aside
      className={`filters-wraper  ${filterStateMobile ? "open" : "closed"}`}
    >
      <div className="filter-header">
        <h3>Фильтр аниме</h3>
      </div>
      <div className="filter-slider-wraper">
        <div className="slider-line" />
        <ReactSlider
          className="filter-slider"
          thumbClassName="slider-thumb"
          trackClassName="slider-track"
          defaultValue={[1977, 2023]}
          renderThumb={(props, state) => (
            <div {...props}>
              <span className="thumb-content">{state.valueNow}</span>
            </div>
          )}
          min={1977}
          max={2023}
          ariaValuetext=""
          // onChange={(years) => setYearsFilter(years)}
        />
        <div className="slider-pips">
          <div className="pip-horisontal big" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal big" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal big" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal big" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal" />
          <div className="pip-horisontal big" />
        </div>
      </div>
      <div className="filters">
        <Filter
          filterName="Жанры"
          filterArray={tagArray}
          filterValue="genre"
          filterDesc="Выберите жанры"
          filterState={tagFilterExpand}
          filterZIndex={500}
          filterSearch
          filterStateSet={setTagFilterExpand}
          filterHeight={300}
        />
        <Filter
          filterName="Типы"
          filterArray={typeArray}
          filterValue="type"
          filterDesc="Выберите тип"
          filterState={typeFilterExpand}
          filterZIndex={400}
          filterSearch={false}
          filterStateSet={setTypeFilterExpand}
          filterHeight={200}
        />
        <Filter
          filterName="Статус"
          filterArray={statusArray}
          filterValue="status"
          filterDesc="Выберите статус"
          filterState={statusFilterExpand}
          filterZIndex={300}
          filterSearch={false}
          filterStateSet={setStatusFilterExpand}
          filterHeight={100}
        />
      </div>
      <div className="filter-button-wraper">
        <button className="filter-button" type="button">
          Искать
        </button>
      </div>
    </aside>
  );
}

export default FilterWrapper;
