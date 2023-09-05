/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import ReactSlider from "react-slider";
import DropDown from "../img/dropDown.svg";

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
  const [tagArray, setTagArray] = useState([
    {
      tagTitle: "ебалай",
      tagValue: "ebalai",
      tagStatus: "inactive",
    },
    {
      tagTitle: "ебалай",
      tagValue: "ebalai",
      tagStatus: "inactive",
    },
    {
      tagTitle: "ебалай",
      tagValue: "ebalai",
      tagStatus: "inactive",
    },
    {
      tagTitle: "ебалай",
      tagValue: "ebalai",
      tagStatus: "inactive",
    },
    {
      tagTitle: "ебалай",
      tagValue: "ebalai",
      tagStatus: "inactive",
    },
    {
      tagTitle: "ебалай",
      tagValue: "ebalai",
      tagStatus: "inactive",
    },
    {
      tagTitle: "ебалай",
      tagValue: "ebalai",
      tagStatus: "inactive",
    },
    {
      tagTitle: "ебалай",
      tagValue: "ebalai",
      tagStatus: "inactive",
    },
  ]);
  const [yearsFilter, setYearsFilter] = useState([1977, 2023]);
  const [activeTags, setActiveTags] = useState([]);

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
        console.log(tagFilterExpand);
        return setTagFilterExpand(!tagFilterExpand);
      case "type":
        return setTypeFilterExpand(!typeFilterExpand);

      default:
        return 0;
    }
  }

  function toggleOptionCheckbox(value: string, status: string, index: number) {
    const newTagArray: {
      tagTitle: string;
      tagValue: string;
      tagStatus: string;
    }[] = [...tagArray];
    if (status === "inactive") {
      newTagArray[index].tagStatus = "add-option";
      setActiveTags([...activeTags, value]);
    }
    if (status === "add-option") {
      newTagArray[index].tagStatus = "remove-option";
    }
    if (status === "remove-option") {
      newTagArray[index].tagStatus = "inactive";
    }
    updateTagArray(newTagArray);
    // const filteredTags = newTagArray.filter(
    //   (tag) => tag.tagStatus === "add-option"
    // );
    // setActiveTags(filteredTags.map((tag) => tag.tagTitle));
  }

  function updateTagArray(
    newArray: { tagTitle: string; tagValue: string; tagStatus: string }[]
  ) {
    setTagArray(newArray);
  }

  function createFilter(
    filterName: string,
    filterArray: {
      tagTitle: string;
      tagValue: string;
      tagStatus: string;
    }[],
    filterValue: string,
    filterDesc: string,
    filterState: boolean,
    filterZIndex: number,
    filterSearch: boolean,
    filterStateSet: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    return (
      <div className="filter-wraper">
        <h3 className="filter-label" style={{ marginBottom: "10px" }}>
          {filterName}
        </h3>
        <div className="filter">
          <button
            className="filter-toggle"
            type="button"
            style={{ borderRadius: "5px 5px 0px 0px" }}
            onClick={() => {
              expandFilter(filterValue);
              return !filterState;
            }}
            onBlur={(e) => {
              if (!(e && e.relatedTarget)) {
                filterStateSet(false);
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
              height: filterState ? "300px" : "0",
              zIndex: `${filterZIndex}`,
              borderBottom: filterState ? "1px solid #3ce3e8" : "none",
            }}
          >
            {filterSearch && (
              <input className="filter-search" placeholder="Поиск жанров" />
            )}
            <div className="filter-list">
              {filterArray.map((tag, index) => (
                <button
                  className="filter-option"
                  type="button"
                  onClick={() =>
                    toggleOptionCheckbox(tag.tagValue, tag.tagStatus, index)
                  }
                  tabIndex={0}
                  onBlur={(e) => {
                    if (!(e && e.relatedTarget)) {
                      setTagFilterExpand(false);
                    }
                  }}
                >
                  <span className={`option-checkbox ${tag.tagStatus}`} />
                  <span className="filter-desc">{tag.tagTitle}</span>
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
      <h2>Каталог</h2>
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
            onChange={(years) => setYearsFilter(years)}
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
            100,
            true,
            setTagFilterExpand
          )}
          {/* {createFilter(
            "Типы",
            "type",
            "Выберите типы",
            typeFilterExpand,
            10,
            false
          )} */}
        </div>
      </aside>
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
    </div>
  );
}

export default CataloguePage;
