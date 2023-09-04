/* eslint-disable no-use-before-define */
import React, { useState } from "react";
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
      tagStatus: "inactive",
    },
    {
      tagTitle: "ебалай",
      tagStatus: "add-option",
    },
    {
      tagTitle: "ебалай",
      tagStatus: "remove-option",
    },
    {
      tagTitle: "ебалай",
      tagStatus: "inactive",
    },
    {
      tagTitle: "ебалай",
      tagStatus: "inactive",
    },
    {
      tagTitle: "ебалай",
      tagStatus: "inactive",
    },
    {
      tagTitle: "ебалай",
      tagStatus: "inactive",
    },
  ]);
  // const [activeTags, setActiveTags] = useState([]);

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

  function toggleOptionCheckbox(status: string, index: number) {
    const newTagArray: { tagTitle: string; tagStatus: string }[] = [
      ...tagArray,
    ];
    if (status === "inactive") {
      newTagArray[index].tagStatus = "add-option";
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

  function updateTagArray(newArray: { tagTitle: string; tagStatus: string }[]) {
    setTagArray(newArray);
  }

  function createFilter(
    filterName: string,
    filterArray: {
      tagTitle: string;
      tagStatus: string;
    }[],
    filterValue: string,
    filterDesc: string,
    filterState: boolean,
    filterZIndex: number,
    filterSearch: boolean
  ) {
    return (
      <div className="filter-wraper">
        <div className="filter-label">{filterName}</div>
        <div className="filter">
          <button
            className="filter-toggle"
            type="button"
            style={{ borderRadius: "5px 5px 0px 0px" }}
            onClick={() => {
              expandFilter(filterValue);
              return !filterState;
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
                  onClick={() => toggleOptionCheckbox(tag.tagStatus, index)}
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
      <div className="filters-wraper">
        <div className="filter-header">
          <h3>Фильтр аниме</h3>
        </div>
        <div className="filters">
          {createFilter(
            "Жанры",
            tagArray,
            "genre",
            "Выберите жанры",
            tagFilterExpand,
            100,
            true
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
    </div>
  );
}

export default CataloguePage;
