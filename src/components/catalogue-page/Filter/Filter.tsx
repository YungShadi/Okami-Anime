/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleTags,
  handleTypes,
  handleStatus,
} from "../../../redux/filterSlice";
import DropDown from "../../img/dropDown.svg";

type FilterType = {
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
};
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
}: FilterType) {
  const dispatch = useDispatch();

  const [tagFilterExpand, setTagFilterExpand] = useState<boolean>(false);
  const [typeFilterExpand, setTypeFilterExpand] = useState<boolean>(false);
  const [statusFilterExpand, setStatusFilterExpand] = useState<boolean>(false);
  const [tagsSearch, setTagsSearch] = useState<string>("");
  const [tagsSearchArray, setTagsSearchArray] = useState<Array<string>>([]);
  const tags = useSelector((state) => state.filter.tagArray);
  const activeTags = useSelector((state) => state.filter.activeTags);
  const excludedTags = useSelector((state) => state.filter.excludedTags);

  function handleFilterOptionClick(tag: string, optionValue: string) {
    if (optionValue === "genre") return dispatch(handleTags(tag));
    if (optionValue === "type") return dispatch(handleTypes(tag));
    if (optionValue === "status") return dispatch(handleStatus(tag));
    return null;
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
      tag.title.toLowerCase().includes(tagsSearch.trim().toLowerCase()),
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
              ? filterArray.map((tag) => (
                  <button
                    className="filter-option"
                    type="button"
                    onClick={() => {
                      handleFilterOptionClick(tag, filterValue);
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
                    <span className={`option-checkbox ${tag.status}`} />
                    <span className="filter-desc">{tag.title}</span>
                  </button>
                ))
              : tagsSearchArray.map((tag) => (
                  <button
                    className="filter-option"
                    type="button"
                    onClick={() => {
                      handleFilterOptionClick(tag, filterValue);
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
                    <span className={`option-checkbox ${tag.status}`} />
                    <span className="filter-desc">{tag.title}</span>
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
