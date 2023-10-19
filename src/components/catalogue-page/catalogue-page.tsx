/* eslint-disable no-nested-ternary */
/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { MobileDto } from "../../types/mobileDto";
import { toggleMenuAction, toggleFilterAction } from "../../redux/mobileSlcie";

import Search from "../img/search.svg";
import FiltersWrapper from "./FiltersWrapper";
import "./catalogue-page.css";
import Title from "../title";

type TitleType = {
  titleStatus: string;
  titleAgeRest: string;
  titleName: string;
  titleTags: string[];
};

function CataloguePage() {
  const dispatch = useDispatch();
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMenuOpened
  );
  const filterStateMobile = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isFilterOpened
  );
  const mobileView = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMobileView
  );

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
      {mobileView ? (
        filterStateMobile ? (
          createPortal(<FiltersWrapper />, document.body)
        ) : (
          ""
        )
      ) : (
        <FiltersWrapper />
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
