import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTitles } from "../../hooks/useTitles";
import { TitleDto } from "../../types/titleDto";
import TitleData from "./TitleData/titleData";
import Player from "./Player/player";
import Bold from "../img/ant-design_bold-outlined.svg";
import Italic from "../img/ant-design_italic-outlined.svg";
import Underline from "../img/ant-design_underline-outlined.svg";
import LineThrough from "../img/ant-design_strikethrough-outlined.svg";
import OrderedList from "../img/ant-design_ordered-list-outlined.svg";
import UnorderedList from "../img/ant-design_unordered-list-outlined.svg";
import DefaultProfPicture from "../img/Аватар.png";

import "./title-page.css";

function TitlePage() {
  const [showFullComment, setShowFullComment] = useState(false);
  const [titleData, setTitleData] = useState<TitleDto>({} as TitleDto);
  const [isThereError, setIsThereError] = useState(false);

  const location = useLocation();

  const { handleGetCurrentTitle } = useTitles();

  const titleId = location.search.replace("?", "");

  useEffect(() => {
    handleGetCurrentTitle(titleId)
      .then((result) => {
        if (
          "data" in result &&
          result.data.results &&
          result.data.results.length > 0
        ) {
          setTitleData(result.data.results[0]);
          document.title = result.data.results[0].material_data.title;
        } else {
          setIsThereError(true);
        }
      })
      .catch(() => {
        setIsThereError(true);
      });
  }, [titleId]);
  // options for condition of title chose

  if (isThereError) {
    return <p>Тайтл не найден</p>;
  }

  return (
    <div className="title">
      <React.Suspense>
        {titleData.title && <TitleData titleData={titleData} />}
        {/* player and player header */}
        <Player playerLink={titleData.link} />
        {/* comments wraper, here post comments and comments */}
        {titleData.title && (
          <div className="comments-wraper">
            <div className="title-header">
              <span className="header-tab just-player">Комментарии</span>
            </div>
            <div className="comments-input">
              {/* styles for comment */}
              <div className="comments-styles">
                <img src={Bold} alt="bold" className="style" />
                <img src={Italic} alt="italic" className="style" />
                <img src={Underline} alt="underline" className="style" />
                <img src={LineThrough} alt="linethrough" className="style" />
                <img src={OrderedList} alt="ordered list" className="style" />
                <img
                  src={UnorderedList}
                  alt="unordered list"
                  className="style"
                />
              </div>
              <textarea
                className="comment-input"
                placeholder="Напишите ваш коммнтарий"
              />
            </div>
            <button className="comment-send" type="button">
              Отправить комментарий
            </button>
            <div className="devider-line-long" />
            {/* comments */}
            <div className="comments">
              {/* comment map here */}
              <div className={`comment ${showFullComment ? "show-full" : ""}`}>
                <img
                  src={DefaultProfPicture}
                  alt="profile pic"
                  className="prof-pic"
                />
                <div className="comment-content">
                  <div className="comment-name-date">
                    <div className="user-name">Chel</div>
                    <div className="date"> 14.14.1321</div>
                  </div>
                  <div
                    className={`comment-text ${
                      showFullComment ? "show-full" : ""
                    }`}
                  >
                    абоба
                  </div>
                  <div className="comment-under-buttons">
                    <a className="comment-answer" href="-">
                      Ответить
                    </a>
                    {1 > 480 && (
                      <button
                        type="button"
                        className="comment-full"
                        onClick={() => setShowFullComment(!showFullComment)}
                      >
                        {showFullComment
                          ? "Скрыть комментарий"
                          : "Показать комментарий полностью"}
                      </button>
                    )}
                  </div>
                </div>
                <div className="comment-devider" />
                {/* once agian i hate how its done with svg */}
                <div className="comment-rating">
                  <svg
                    width="55"
                    height="55"
                    viewBox="0 15 55 55"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M43.6306 50C44.5151 50 44.9641 48.9361 44.3471 48.3024L28.2165 31.7358C27.8239 31.3327 27.1761 31.3327 26.7835 31.7358L10.6529 48.3024C10.0359 48.9361 10.4849 50 11.3694 50L43.6306 50Z"
                        fill="#3CE3E8"
                      />
                    </g>
                  </svg>
                  <div className="curr-rating">12</div>
                  <svg
                    width="55"
                    height="55"
                    viewBox="0 -20 55 55"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M11.3694 0C10.4849 0 10.0359 1.0639 10.6529 1.69762L26.7835 18.2642C27.1761 18.6673 27.8239 18.6673 28.2165 18.2642L44.3471 1.69762C44.9641 1.0639 44.5151 0 43.6306 0L11.3694 0Z"
                        fill="#E83C46"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="comment" style={{ display: "none" }}>
                comment here
              </div>
            </div>
          </div>
        )}
      </React.Suspense>
    </div>
  );
}

export default TitlePage;
