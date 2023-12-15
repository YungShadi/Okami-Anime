/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactSlider from "react-slider";
import { useLocation, useNavigate } from "react-router-dom";
import { toggleFilterAction } from "../../../redux/mobileSlcie";
import Filter from "./Filter";
import {
  handleLinkActiveTags,
  handleLinkExcludedTags,
  handleLinkActiveTypes,
  handleLinkExcludedTypes,
  handleLinkStatus,
} from "../../../redux/filterSlice";
import { MobileDto } from "../../../types/mobileDto";
import CloseCross from "../../img/close-cross.svg";
import "../catalogue-page.scss";

function FilterWrapper({
  searchInput,
  yearFrom,
  yearTo,
}: {
  searchInput: string;
  yearFrom: string | null;
  yearTo: string | null;
}) {
  const location = useLocation();
  const filterStateMobile = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isFilterOpened,
  );
  const mobileView = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMobileView,
  );
  const tagArray = useSelector((state) => state.filter.tagArray);
  const typeArray = useSelector((state) => state.filter.typeArray);
  const statusArray = useSelector((state) => state.filter.statusArray);
  const activeTags = useSelector((state) => state.filter.activeTags);
  const activeTypes = useSelector((state) => state.filter.activeTypes);
  const activeStatus = useSelector((state) => state.filter.activeStatus);
  const excludedTags = useSelector((state) => state.filter.excludedTags);
  const excludedTypes = useSelector((state) => state.filter.excludedTypes);

  const pageParams = new URLSearchParams(location.search);

  const activeTagsLink = pageParams.getAll("active_tags");
  const excludedTagsLink = pageParams.getAll("excluded_tags");
  const activeTypesLink = pageParams.getAll("active_types");
  const excludedTypesLink = pageParams.getAll("excluded_types");
  const statusLink = pageParams.getAll("status");

  const [yearsFilter, setYearsFilter] = useState([1977, 2023]);

  const [tagFilterExpand, setTagFilterExpand] = useState(false);
  const [typeFilterExpand, setTypeFilterExpand] = useState(false);
  const [statusFilterExpand, setStatusFilterExpand] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const applyThings = (value: string, array: string[], link: string) => {
    link += `${value}=`;
    array.map((thing, i, arr) => {
      if (i + 1 === arr.length) {
        link += `${thing}`;
      } else {
        link += `${thing},`;
      }
    });
    return link;
  };

  const createSearch = () => {
    let link = "/catalogue?page=1";
    if (searchInput) link += `search=${searchInput}&`;

    if (activeTags.length !== 0) {
      link = applyThings("&active_tags", activeTags, link);
    }

    if (excludedTags.length !== 0) {
      link = applyThings("&excluded_tags", excludedTags, link);
    }

    if (activeTypes.length !== 0) {
      link = applyThings("&active_types", activeTypes, link);
    }

    if (excludedTypes.length !== 0) {
      link = applyThings("&excluded_types", excludedTypes, link);
    }

    if (activeStatus.length !== 0) {
      link = applyThings("&status", activeStatus, link);
    }

    if (yearsFilter) {
      link += `&from=${yearsFilter[0]}`;
      link += `&to=${yearsFilter[1]}`;
    }
    navigate(link);
  };

  useEffect(() => {
    if (activeTagsLink[0]) {
      dispatch(handleLinkActiveTags(activeTagsLink[0].split(",")));
    }
    if (excludedTagsLink[0]) {
      dispatch(handleLinkExcludedTags(excludedTagsLink[0].split(",")));
    }
    if (activeTypesLink[0]) {
      dispatch(handleLinkActiveTypes(activeTypesLink[0].split(",")));
    }
    if (excludedTypesLink[0]) {
      dispatch(handleLinkExcludedTypes(excludedTypesLink[0].split(",")));
    }
    if (statusLink[0]) {
      dispatch(handleLinkStatus(statusLink[0].split(",")));
    }
  }, []);

  return (
    <aside
      className={`filters-wraper  ${filterStateMobile ? "open" : "closed"}`}
    >
      <div className="filter-header">
        <h3>Фильтр аниме</h3>
        {mobileView && (
          <button
            type="button"
            className="close-mobile-filter"
            onClick={() => {
              dispatch(toggleFilterAction(false));
            }}
          >
            <img src={CloseCross} alt="close" />
          </button>
        )}
      </div>
      <div className="filter-slider-wraper">
        <div className="slider-line" />
        <ReactSlider
          className="filter-slider"
          thumbClassName="slider-thumb"
          trackClassName="slider-track"
          defaultValue={yearFrom && yearTo ? [yearFrom, yearTo] : yearsFilter}
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
        <button
          className="filter-button"
          type="button"
          onClick={() => createSearch()}
        >
          Искать
        </button>
      </div>
    </aside>
  );
}

export default FilterWrapper;
