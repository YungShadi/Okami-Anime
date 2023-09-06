import React from "react";
import DefaultPoster from "../img/poster.png";

import "./title.css";

type TitleType = {
  titleStatus: string;
  titleAgeRest: string;
  titleName: string;
  titleTags: string[];
};

function Title({ titleName, titleAgeRest, titleStatus, titleTags }: TitleType) {
  return (
    <div className="season-title title-main" >
      <span className="title-status status">{titleStatus}</span>
      <span className="title-age-rest age-rest">{titleAgeRest}</span>
      <img className="title-poster poster" src={DefaultPoster} alt="poster" />
      <span className="title-name name">{titleName}</span>
      <div className="title-tags tags">
        <span className="tag">
          {titleTags.map((tag) => (
            <span>{tag} / </span>
          ))}
        </span>
      </div>
    </div>
  );
}
export default Title;
