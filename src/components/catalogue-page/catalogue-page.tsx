/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactSlider from "react-slider";
import { MobileDto } from "../../types/mobileDto";
import Filter from "./Filter";
import { toggleMenuAction, toggleFilterAction } from "../../redux/mobileSlcie";

import Search from "../img/search.svg";
import "./catalogue-page.css";
import Title from "../title";

type TitleType = {
  titleStatus: string;
  titleAgeRest: string;
  titleName: string;
  titleTags: string[];
};

function CataloguePage() {
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMenuOpened
  );
  const filterStateMobile = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isFilterOpened
  );
  const dispatch = useDispatch();
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
      title: "Психологический триллер ",
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
      title: "Короткометражный фильм",
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

  // const [yearsFilter, setYearsFilter] = useState([1977, 2023]);

  const titlesArray: TitleType[] = [
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
  ];

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if (menuState) {
        dispatch(toggleMenuAction(!menuState));
      }
    };
  });
  return (
    <div className="catalogue-page">
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
            filterSearch={true}
            filterStateSet={setTagFilterExpand}
            filterHeight={300}
          />
          {/* {createFilter(
            "Типы",
            typeArray,
            "type",
            "Выберите тип",
            typeFilterExpand,
            400,
            false,
            setTypeFilterExpand,
            200
          )}
          {createFilter(
            "Статус",
            statusArray,
            "status",
            "Выберите статус",
            statusFilterExpand,
            300,
            false,
            setStatusFilterExpand,
            100
          )} */}
        </div>
        <div className="filter-button-wraper">
          <button className="filter-button" type="button">
            Искать
          </button>
        </div>
      </aside>
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
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default CataloguePage;
