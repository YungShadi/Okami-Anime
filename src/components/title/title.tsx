import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DefaultPoster from "../img/poster.png";
import { TitleDto } from "../../types/titleDto";
import { FilterArrayElement } from "../../types/filterDto";

import "./title.css";

type TitleType = {
  titleClass: string;
  titleData: TitleDto;
  onClickHandle: CallableFunction;
};

const Title = React.memo(
  ({ titleClass, titleData, onClickHandle }: TitleType) => {
    const titleTags = titleData.material_data?.anime_genres;
    const titleEpisodes = titleData.last_episode;
    const titleName = titleData.material_data?.title;
    const titleId = titleData.id;
    const titleStatus = titleData.material_data?.anime_status;
    const titlePoster = titleData.material_data?.poster_url;
    const titleAgeRest = titleData.material_data?.rating_mpaa;
    const titleFullName = titleData.material_data?.anime_title;
    const titleType = titleData.type;

    const tags = useSelector(
      (state: { filter: { tagArray: FilterArrayElement[] } }) =>
        state.filter.tagArray,
    );

    function getEpisodeString() {
      if (titleEpisodes % 10 === 1 && titleEpisodes % 100 !== 11) {
        return `${titleEpisodes} эпизод`;
      }
      if (
        (titleEpisodes % 10 === 2 ||
          titleEpisodes % 10 === 3 ||
          titleEpisodes % 10 === 4) &&
        titleEpisodes % 100 !== 12 &&
        titleEpisodes % 100 !== 13 &&
        titleEpisodes % 100 !== 14
      ) {
        return `${titleEpisodes} эпизода`;
      }
      return `${titleEpisodes} эпизодов`;
    }

    function defineStatus() {
      switch (titleStatus) {
        case "ongoing":
          return "Онгоинг";
        case "released":
          return "Вышло";

        default:
          return `¯\\(°_o)/¯`;
      }
    }

    function defineAgeRest() {
      switch (titleAgeRest) {
        case "G":
          return "0+";
        case "PG":
          return "6+";
        case "PG-13":
          return "12+";
        case "R":
          return "18+";
        case "NC-17":
          return "21+";

        default:
          return `¯\\(°_o)/¯`;
      }
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
    if (titleClass === "search-result-title") {
      return (
        <Link
          className={`${titleClass} title-main`}
          to={`/article/${transliterate(titleName || `¯\\(°_o)/¯`)}?${titleId}`}
          state={titleData}
          onClick={(e) => onClickHandle(e)}
        >
          <div
            className="title-poster-wraper"
            style={{ color: "white", textDecoration: "none" }}
          >
            <span className="title-status status">
              {defineStatus() || `¯\\(°_o)/¯`}
            </span>
            <img
              className="title-poster poster"
              src={titlePoster || DefaultPoster}
              alt="poster"
              loading="lazy"
            />

            <span className="age-rest">{defineAgeRest() || `¯\\(°_o)/¯`}</span>
            <div className="play-button-wraper" />
          </div>
          <div className="title-name-tags">
            <span
              className="title-name name"
              title={titleFullName || `¯\\(°_o)/¯`}
            >
              {titleName}
            </span>
            <span className="title-episodes">
              {titleType === "anime" ? "Фильм" : getEpisodeString()}
            </span>
            <div className="title-tags tags">
              {titleTags
                ?.flatMap((tag) => tags.filter((el) => el.title === tag))
                .map((tag, i, arr) => {
                  if (i + 1 === arr.length) {
                    return (
                      <Link
                        className="tag"
                        to={{
                          pathname: "/catalogue",
                          search: `page=1&active_tags=${tag.value}`,
                        }}
                        key={tag.value}
                      >
                        {tag.title}
                      </Link>
                    );
                  }
                  return (
                    <Link
                      className="tag"
                      to={{
                        pathname: "/catalogue",
                        search: `page=1&active_tags=${tag.value}`,
                      }}
                      key={tag.value}
                    >
                      {tag.title},{" "}
                    </Link>
                  );
                })}
            </div>
            <span className="title-type">TB Сериал /</span>
            <span className="title-year"> 2023</span>
          </div>
        </Link>
      );
    }
    return (
      <div className={`${titleClass} title-main`}>
        <Link
          className="title-poster-wraper"
          style={{ color: "white", textDecoration: "none" }}
          to={`/article/${transliterate(titleName || `¯\\(°_o)/¯`)}?${titleId}`}
          state={titleData}
        >
          <span className="title-status status">
            {defineStatus() || `¯\\(°_o)/¯`}
          </span>
          <img
            className="title-poster poster"
            src={titlePoster || DefaultPoster}
            alt="poster"
          />

          <span className="age-rest">{defineAgeRest() || `¯\\(°_o)/¯`}</span>
          <div className="play-button-wraper" />
        </Link>
        <div className="title-name-tags">
          <Link
            className="title-name name"
            title={titleFullName || `¯\\(°_o)/¯`}
            to={`/article/${transliterate(
              titleName || `¯\\(°_o)/¯`,
            )}?${titleId}`}
          >
            {titleName}
          </Link>
          <span className="title-episodes">
            {titleType === "anime" ? "Фильм" : getEpisodeString()}
          </span>
          <div className="title-tags tags">
            {titleTags
              ?.flatMap((tag) => tags.filter((el) => el.title === tag))
              .map((tag, i, arr) => {
                if (i + 1 === arr.length) {
                  return (
                    <Link
                      className="tag"
                      to={{
                        pathname: "/catalogue",
                        search: `page=1&active_tags=${tag.value}`,
                      }}
                      key={tag.value}
                    >
                      {tag.title}
                    </Link>
                  );
                }
                return (
                  <Link
                    className="tag"
                    to={{
                      pathname: "/catalogue",
                      search: `page=1&active_tags=${tag.value}`,
                    }}
                    key={tag.value}
                  >
                    {tag.title},{" "}
                  </Link>
                );
              })}
          </div>
          <span className="title-type">TB Сериал /</span>
          <span className="title-year"> 2023</span>
        </div>
      </div>
    );
  },
);
export default Title;
