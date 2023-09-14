/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import ReactSlider from "react-slider";
import DropDown from "../img/dropDown.svg";

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
  const [tagFilterExpand, setTagFilterExpand] = useState(false);
  const [typeFilterExpand, setTypeFilterExpand] = useState(false);
  const [statusFilterExpand, setStatusFilterExpand] = useState(false);
  const [tagArray, setTagArray] = useState([
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
  const [activeTags, setActiveTags] = useState([]);
  const [activeType, setActiveType] = useState([]);
  const [activeStatus, setActiveStatus] = useState([]);

  const titlesArray: TitleType[] = [
    {
      titleStatus: "Еблан",
      titleAgeRest: "21+",
      titleName: "Обьебос",
      titleTags: ["gay", "porn", "suck"],
    },
    {
      titleStatus: "Еблан",
      titleAgeRest: "21+",
      titleName: "Обьебос",
      titleTags: ["gay", "porn", "suck"],
    },
    {
      titleStatus: "Еблан",
      titleAgeRest: "21+",
      titleName: "Обьебос",
      titleTags: ["gay", "porn", "suck"],
    },
    {
      titleStatus: "Еблан",
      titleAgeRest: "21+",
      titleName: "Обьебос",
      titleTags: ["gay", "porn", "suck"],
    },
    {
      titleStatus: "Еблан",
      titleAgeRest: "21+",
      titleName: "Обьебос",
      titleTags: ["gay", "porn", "suck"],
    },
    {
      titleStatus: "Еблан",
      titleAgeRest: "21+",
      titleName: "Обьебос",
      titleTags: ["gay", "porn", "suck"],
    },
  ];

  function expandFilter(value: string) {
    switch (value) {
      case "genre":
        return setTagFilterExpand(!tagFilterExpand);
      case "type":
        return setTypeFilterExpand(!typeFilterExpand);
      case "status":
        return setStatusFilterExpand(!statusFilterExpand);

      default:
        return 0;
    }
  }

  function toggleOptionCheckbox(
    value: string,
    status: string,
    index: number,
    filterValue: string
  ) {
    const newTagArray: {
      title: string;
      value: string;
      status: string;
    }[] = [...tagArray];
    const newStatusArray: {
      title: string;
      value: string;
      status: string;
    }[] = [...statusArray];
    const newTypeArray: {
      title: string;
      value: string;
      status: string;
    }[] = [...typeArray];
    switch (filterValue) {
      case "genre":
        if (status === "inactive") {
          newTagArray[index].status = "add-option";
          setActiveTags([...activeTags, value]);
        }
        if (status === "add-option") {
          newTagArray[index].status = "remove-option";
        }
        if (status === "remove-option") {
          newTagArray[index].status = "inactive";
        }
        updateTagArray(newTagArray);
        const filteredTags = newTagArray.filter(
          (tag) => tag.status === "add-option"
        );
        setActiveTags(filteredTags.map((tag) => tag.title));
        break;
      case "type":
        if (status === "inactive") {
          newTypeArray[index].status = "add-option";
          setActiveType([...activeType, value]);
        }
        if (status === "add-option") {
          newTypeArray[index].status = "inactive";
        }
        updateTagArray(newTypeArray);
        const filteredTypes = newTypeArray.filter(
          (type) => type.status === "add-option"
        );
        setActiveType(filteredTypes.map((tag) => tag.title));
        break;
      case "status":
        if (status === "inactive") {
          newStatusArray[index].status = "add-option";
          setActiveStatus([...activeStatus, value]);
        }
        if (status === "add-option") {
          newStatusArray[index].status = "inactive";
        }
        updateTagArray(newTypeArray);
        const filteredStatus = newStatusArray.filter(
          (statuss) => statuss.status === "add-option"
        );
        setActiveStatus(filteredStatus.map((tag) => tag.title));
        break;
      default:
        break;
    }
  }

  function updateTagArray(
    newArray: { title: string; value: string; status: string }[]
  ) {
    setTagArray(newArray);
  }

  function createFilter(
    filterName: string,
    filterArray: {
      title: string;
      value: string;
      status: string;
    }[],
    filterValue: string,
    filterDesc: string,
    filterState: boolean,
    filterZIndex: number,
    filterSearch: boolean,
    filterStateSet: React.Dispatch<React.SetStateAction<boolean>>,
    filterHeigth: number
  ) {
    return (
      <div className="filter-wraper">
        <h2 className="filter-label" style={{ marginBottom: "10px" }}>
          {filterName}
        </h2>
        <div className="filter">
          <button
            className="filter-toggle"
            type="button"
            style={{ borderRadius: "5px 5px 0px 0px" }}
            onClick={() => {
              if (tagFilterExpand === true) {
                setTagFilterExpand(false);
              }
              if (typeFilterExpand === true) {
                setTypeFilterExpand(false);
              }
              if (statusFilterExpand === true) {
                setStatusFilterExpand(false);
              }
              expandFilter(filterValue);
              return !filterState;
            }}
            onBlur={(e) => {
              if (!(e && e.relatedTarget)) {
                filterStateSet(false);
                if (tagFilterExpand === true) {
                  setTagFilterExpand(false);
                }
                if (typeFilterExpand === true) {
                  setTypeFilterExpand(false);
                }
                if (statusFilterExpand === true) {
                  setStatusFilterExpand(false);
                }
              }
            }}
          >
            <span className="filter-values text-left">{filterDesc}</span>
            <img
              src={DropDown}
              alt="arrow"
              style={{
                transform: filterState ? "rotate(0)" : "rotate(90deg)",
                transition: "0.3s",
              }}
            />
          </button>
          <div
            className="filter-content"
            style={{
              height: filterState ? `${filterHeigth}px` : "0",
              zIndex: `${filterZIndex}`,
              borderBottom: filterState ? "1px solid #3ce3e8" : "none",
            }}
          >
            {filterSearch && (
              <input
                className="filter-search"
                placeholder="Поиск жанров"
                onBlur={(e) => {
                  if (!(e && e.relatedTarget)) {
                    filterStateSet(false);
                    if (tagFilterExpand === true) {
                      setTagFilterExpand(false);
                    }
                    if (typeFilterExpand === true) {
                      setTypeFilterExpand(false);
                    }
                    if (statusFilterExpand === true) {
                      setStatusFilterExpand(false);
                    }
                  }
                }}
              />
            )}
            <div className="filter-list">
              {filterArray.map((tag, index) => (
                <button
                  className="filter-option"
                  type="button"
                  onClick={() =>
                    toggleOptionCheckbox(
                      tag.title,
                      tag.status,
                      index,
                      filterValue
                    )
                  }
                  tabIndex={0}
                  onBlur={(e) => {
                    if (!(e && e.relatedTarget)) {
                      filterStateSet(false);
                      if (tagFilterExpand === true) {
                        setTagFilterExpand(false);
                      }
                      if (typeFilterExpand === true) {
                        setTypeFilterExpand(false);
                      }
                      if (statusFilterExpand === true) {
                        setStatusFilterExpand(false);
                      }
                    }
                  }}
                >
                  <span className={`option-checkbox ${tag.status}`} />
                  <span className="filter-desc">{tag.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="catalogue-page">
      <aside className="filters-wraper">
        <div className="filter-header">
          <h3>Фильтр аниме</h3>
        </div>
        <div className="filter-slider-wraper">
          {/* <span className="filter-span">
            {yearsFilter[0] !== yearsFilter[1]
              ? `Аниме, вышедшие в диапазоне от ${yearsFilter[0]} г. до ${yearsFilter[1]}г. `
              : `Аниме, вышедшие только в ${yearsFilter[1]} году`}
          </span> */}
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
          {createFilter(
            "Жанры",
            tagArray,
            "genre",
            "Выберите жанры",
            tagFilterExpand,
            500,
            true,
            setTagFilterExpand,
            300
          )}
          {createFilter(
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
          )}
        </div>
        <div className="filter-button-wraper">
          <button className="filter-button" type="button">
            Искать
          </button>
        </div>
      </aside>
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
