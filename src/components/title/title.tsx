import React from "react";
import { Link } from "react-router-dom";
import DefaultPoster from "../img/poster.png";

import "./title.css";

type TitleType = {
  titleStatus: string;
  titleAgeRest: string;
  titleName: string;
  titleTags: string[];
  titleClass: string;
  titlePoster: string;
  titleEpisodes: number;
  titleFullName: string;
  titleId: string;
};

function Title({
  titleName,
  titleAgeRest,
  titleStatus,
  titleTags,
  titleClass,
  titlePoster,
  titleEpisodes,
  titleFullName,
  titleId,
}: TitleType) {
  let episodes;
  if (titleEpisodes === 1) {
    episodes = "1 эпизод";
  } else if (titleEpisodes <= 4) {
    episodes = `${titleEpisodes} эпизода`;
  } else {
    episodes = `${titleEpisodes} эпизодов`;
  }
  function transliterate(word: string) {
    // Словарь для транслитерации
    const translitDict: Record<string, string> = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "e",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "kh",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ъ: "",
      ы: "y",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
    };

    // eslint-disable-next-line no-param-reassign
    word = word.toLowerCase();

    let result = "";
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      if (translitDict[char]) {
        result += translitDict[char];
      } else {
        result += char;
      }
    }
    result = result.replace(/[^\w\s]/g, "");
    result = result.replace(/\s+/g, "-");
    return result;
  }
  return (
    <Link
      className={`${titleClass} title-main`}
      style={{ color: "white", textDecoration: "none" }}
      to={`article/${transliterate(titleName)}-${titleId}`}
    >
      <div className="title-poster-wraper">
        <span className="title-status status">{titleStatus}</span>

        {titlePoster ? (
          <img className="title-poster poster" src={titlePoster} alt="poster" />
        ) : (
          <img
            className="title-poster poster"
            src={DefaultPoster}
            alt="poster"
          />
        )}
        <span className="age-rest">{titleAgeRest}</span>
        <div className="play-button-wraper" />
      </div>
      <div className="title-name-tags">
        <span className="title-name name" title={titleFullName}>
          {titleName}
        </span>
        <span className="title-episodes">{episodes}</span>
        <div className="title-tags tags">
          <span className="tag">
            {titleTags.slice(0, 3).map((tag, i, arr) => {
              if (i + 1 === arr.length) {
                return <span>{tag}</span>;
              }
              return <span>{tag}, </span>;
            })}
          </span>
        </div>
        <span className="title-type">TB Сериал /</span>
        <span className="title-year"> 2023</span>
      </div>
    </Link>
  );
}
export default Title;
