import React, { useState } from "react";
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
  const [activeTags, setActiveTags] = useState([]);
  const [activeType, setActiveType] = useState([]);
  const [activeStatus, setActiveStatus] = useState([]);
  const [tagFilterExpand, setTagFilterExpand] = useState(false);
  const [typeFilterExpand, setTypeFilterExpand] = useState(false);
  const [statusFilterExpand, setStatusFilterExpand] = useState(false);
  function toggleOptionCheckbox(index: number) {
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
        // updateTagArray(newTypeArray);
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
        // updateTagArray(newTypeArray);
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
            />
          )}
          <div className="filter-list">
            {filterArray.map(({ title, status }, index) => (
              <button
                className="filter-option"
                type="button"
                onClick={() =>
                  toggleOptionCheckbox(title, status, index, filterValue)
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
                <span className={`option-checkbox ${status}`} />
                <span className="filter-desc">{title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
