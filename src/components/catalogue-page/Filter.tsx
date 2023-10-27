/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from "react";
import DropDown from "../img/dropDown.svg";

function Filter({
  filterName,
  filterArray,
  filterValue,
  filterDesc,
  filterState,
  filterZIndex,
  filterSearch,
  filterStateSet,
  filterHeight,
}: {
  filterName: string;
  filterArray: {
    title: string;
    value: string;
    status: string;
  }[];
  filterValue: string;
  filterDesc: string;
  filterState: boolean;
  filterZIndex: number;
  filterSearch: boolean;
  filterStateSet: React.Dispatch<React.SetStateAction<boolean>>;
  filterHeight: number;
}) {
  const [activeTags, setActiveTags] = useState<Array<string>>([]);
  const [activeType, setActiveType] = useState<Array<string>>([]);
  const [activeStatus, setActiveStatus] = useState<Array<string>>([]);
  const [tagFilterExpand, setTagFilterExpand] = useState<boolean>(false);
  const [typeFilterExpand, setTypeFilterExpand] = useState<boolean>(false);
  const [statusFilterExpand, setStatusFilterExpand] = useState<boolean>(false);
  const [tagsSearch, setTagsSearch] = useState<string>("");
  const [tagsSearchArray, setTagsSearchArray] = useState<Array<string>>([]);
  function handleFilterOptionClick(
    title: string,
    status: string,
    index: number,
    optionValue: string,
    value: string
  ) {
    const newTagArray: {
      title: string;
      value: string;
      status: string;
    }[] = [...filterArray];
    const newStatusArray: {
      title: string;
      value: string;
      status: string;
    }[] = [...filterArray];
    const newTypeArray: {
      title: string;
      value: string;
      status: string;
    }[] = [...filterArray];
    switch (optionValue) {
      case "genre":
        if (status === "inactive") {
          newTagArray[index]!.status = "add-option";
          setActiveTags([...activeTags, value]);
        }
        if (status === "add-option") {
          newTagArray[index]!.status = "remove-option";
          setActiveTags([...activeTags, value]);
        }
        if (status === "remove-option") {
          newTagArray[index]!.status = "inactive";
          setActiveTags([...activeTags, value]);
        }
        const filteredTags = newTagArray.filter(
          (tag) => tag.status === "add-option"
        );
        setActiveTags(filteredTags.map((tag) => tag.value));
        return activeTags;

      case "type":
        if (status === "inactive") {
          newTypeArray[index]!.status = "add-option";
          setActiveType([...activeType, value]);
        }
        if (status === "add-option") {
          newTypeArray[index]!.status = "remove-option";
          setActiveType([...activeType, value]);
        }
        if (status === "remove-option") {
          newTypeArray[index]!.status = "inactive";
          setActiveType([...activeType, value]);
        }
        const filteredType = newTypeArray.filter(
          (tag) => tag.status === "add-option"
        );
        setActiveType(filteredType.map((tag) => tag.value));
        return setActiveType;
      case "status":
        if (status === "inactive") {
          newStatusArray[index]!.status = "add-option";
          setActiveStatus([...activeStatus, value]);
        }
        if (status === "add-option") {
          newStatusArray[index]!.status = "inactive";
          setActiveStatus([...activeStatus, value]);
        }
        const filteredStatus = newStatusArray.filter(
          (tag) => tag.status === "add-option"
        );
        setActiveStatus(filteredStatus.map((tag) => tag.value));
        return setActiveStatus;
      default:
        return 0;
    }
  }

  function expandFilter(value: string) {
    filterStateSet(!filterState);
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

  useEffect(() => {
    const arrayAfterSearch = filterArray.filter((tag) =>
      tag.title.toLowerCase().includes(tagsSearch.toLowerCase())
    );
    setTagsSearchArray(arrayAfterSearch);
  }, [filterArray, tagsSearch]);

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
            height: filterState ? `${filterHeight}px` : "0",
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
              value={tagsSearch}
              onChange={(e) => {
                setTagsSearch(e.target.value);
              }}
            />
          )}
          <div className="filter-list">
            {tagsSearchArray.length === 0 && !tagsSearch
              ? filterArray.map(({ title, status, value }, index) => (
                  <button
                    className="filter-option"
                    type="button"
                    onClick={() => {
                      handleFilterOptionClick(
                        title,
                        status,
                        index,
                        filterValue,
                        value
                      );
                    }}
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
                    <span className={`option-checkbox ${status}`} />
                    <span className="filter-desc">{title}</span>
                  </button>
                ))
              : tagsSearchArray.map(({ title, status, value }, index) => (
                  <button
                    className="filter-option"
                    type="button"
                    onClick={() => {
                      handleFilterOptionClick(
                        title,
                        status,
                        index,
                        filterValue,
                        value
                      );
                    }}
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
                    <span className={`option-checkbox ${status}`} />
                    <span className="filter-desc">{title}</span>
                  </button>
                ))}
          </div>
          {tagsSearchArray.length === 0 && tagsSearch.length > 0 && (
            <span className="not-found-error">
              Жанры по вашему запросу не найдены
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
