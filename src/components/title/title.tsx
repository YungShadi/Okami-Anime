import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DefaultPoster from "../img/poster.png";
import { TitleDto } from "../../types/titleDto";

import "./title.css";

type TitleType = {
  titleClass: string;
  titleData: TitleDto;
};

function Title({ titleClass, titleData }: TitleType) {
  const titleTags = titleData.material_data?.anime_genres;
  const titleEpisodes = titleData.last_episode;
  const titleName = titleData.material_data?.title;
  const titleId = titleData.id;
  const titleStatus = titleData.material_data?.anime_status;
  const titlePoster = titleData.material_data?.poster_url;
  const titleAgeRest = titleData.material_data?.rating_mpaa;
  const titleFullName = titleData.material_data?.anime_title;
  const titleType = titleData.type;

  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const tags = useSelector((state) => state.filter.tagArray);
  const getCurrentTags = () => {
    const newTags = titleTags?.flatMap((tag) =>
      tags.filter((el) => el.title === tag),
    );
    setCurrentTags(newTags || []);
  };

  useEffect(() => {
    getCurrentTags();
  }, []);

  let episodes;
  if (titleEpisodes === 1) {
    episodes = "1 эпизод";
  } else if (titleEpisodes <= 4) {
    episodes = `${titleEpisodes} эпизода`;
  } else {
    episodes = `${titleEpisodes} эпизодов`;
  }
  function transliterate(word: string) {
    if (!word) return "lol";
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
    <div className={`${titleClass} title-main`}>
      <Link
        className="title-poster-wraper"
        style={{ color: "white", textDecoration: "none" }}
        to={`/article/${transliterate(titleName)}?${titleId}`}
        state={titleData}
      >
        <span className="title-status status">
          {titleStatus || `¯\\(°_o)/¯`}
        </span>

        {titlePoster ? (
          <img className="title-poster poster" src={titlePoster} alt="poster" />
        ) : (
          <img
            className="title-poster poster"
            src={DefaultPoster}
            alt="poster"
          />
        )}
        <span className="age-rest">{titleAgeRest || `¯\\(°_o)/¯`}</span>
        <div className="play-button-wraper" />
      </Link>
      <div className="title-name-tags">
        <span className="title-name name" title={titleFullName || `¯\\(°_o)/¯`}>
          {titleName}
        </span>
        <span className="title-episodes">
          {titleType === "anime" ? "Фильм" : episodes}
        </span>
        <div className="title-tags tags">
          {titleTags?.slice(0, 3).map((tag, i, arr) => {
            if (i + 1 === arr.length) {
              return (
                <Link
                  className="tag"
                  to={{
                    pathname: "/catalogue",
                    search: `page=1&included-tags=${tag}`,
                  }}
                >
                  {tag}
                </Link>
              );
            }
            return (
              <Link
                className="tag"
                to={{
                  pathname: "/catalogue",
                  search: `page=1&included-tags=${tag}`,
                }}
              >
                {tag},{" "}
              </Link>
            );
          })}
        </div>
        <span className="title-type">TB Сериал /</span>
        <span className="title-year"> 2023</span>
      </div>
    </div>
  );
}
export default Title;
