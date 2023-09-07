import React from "react";
import DefaultPoster from "../img/poster.png";

import "./title.css";

type TitleType = {
  titleStatus: string;
  titleAgeRest: string;
  titleName: string;
  titleTags: string[];
  titleClass: string;
};

function Title({
  titleName,
  titleAgeRest,
  titleStatus,
  titleTags,
  titleClass,
}: TitleType) {
  return (
    <div className={`${titleClass} title-main`}>
      <div className="title-poster-wraper">
        <span className="title-status status">{titleStatus}</span>
        <img className="title-poster poster" src={DefaultPoster} alt="poster" />
        <span className="title-age-rest age-rest">{titleAgeRest}</span>
      </div>
      <div className="title-name-tags">
        <span className="title-name name">{titleName}</span>
        <div className="title-tags tags">
          <span className="tag">
            {titleTags.map((tag) => (
              <span>{tag} / </span>
            ))}
          </span>
        </div>
        <span className="title-episodes">12 эпизодов</span>
        <span className="title-type">ТВ Сериал /</span>
        <span className="title-year"> 2023</span>
      </div>
    </div>
  );
}
export default Title;
