import React, { useEffect, useState } from "react";
import Poster from "../img/Постер.png";
import "./title-page.css";
import Arrow from "../img/mdi_menu-down.svg";
import Bold from "../img/ant-design_bold-outlined.svg";
import Italic from "../img/ant-design_italic-outlined.svg";
import Underline from "../img/ant-design_underline-outlined.svg";
import LineThrough from "../img/ant-design_strikethrough-outlined.svg";
import OrderedList from "../img/ant-design_ordered-list-outlined.svg";
import UnorderedList from "../img/ant-design_unordered-list-outlined.svg";
import Book from "../img/willWatch.svg";
import CloseEye from "../img/wathced.svg";
import OpenEye from "../img/wahtching.svg";
import TrashCan from "../img/drop.svg";
import Heart from "../img/like.svg";

function TitlePage() {
  const [triggerToggle, setTriggerToggle] = useState(false);
  const [selectState, setSelectState] = useState("Добавить в список");
  const [triggerContent, setTriggerContent] = useState(
    <div className="trigger-content">Добавить в список</div>
  );
  useEffect(() => {
    if (selectState === "willWatch") {
      setTriggerContent(
        <div className="trigger-content">
          <div className="option-content">Буду смотерть</div>
          <div className="option-line" />
          <img src={Book} alt="book" className="option-img" />
        </div>
      );
    }
  }, [selectState]);

  function showOptions() {
    setTriggerToggle(!triggerToggle);
  }

  return (
    <div className="title">
      <div className="title-info">
        <div className="poster-wraper">
          <img className="title-poster" alt="poster" src={Poster} />
          <div className="select-wrapper">
            <button
              className="select-trigger"
              onClick={showOptions}
              type="button"
            >
              {triggerContent}
            </button>
            <div
              className="select-options"
              style={{
                height: triggerToggle ? "300px" : "0px",
                display: "block",
              }}
            >
              {selectState !== "willWatch" && (
                <button
                  className="option"
                  type="button"
                  onClick={() => setSelectState("willWatch")}
                >
                  <div className="option-content">Буду смотерть</div>
                  <div className="option-line" />
                  <img src={Book} alt="book" className="option-img" />
                </button>
              )}
              <div className="option">
                <div className="option-content">Просмотренно</div>
                <div className="option-line" />
                <img src={CloseEye} alt="close eye" className="option-img" />
              </div>
              <div className="option">
                <div className="option-content">Смотрю</div>
                <div className="option-line" />
                <img src={OpenEye} alt="open eye" className="option-img" />
              </div>
              <div className="option">
                <div className="option-content">Брошено</div>
                <div className="option-line" />
                <img src={TrashCan} alt="trash can" className="option-img" />
              </div>
              <div className="option">
                <div className="option-content">Любимое</div>
                <div className="option-line" />
                <img src={Heart} alt="heart" className="option-img" />
              </div>
              <div className="option">
                <div className="option-content" style={{ color: "#FF0900" }}>
                  Удалить
                </div>
                <div className="option-line" />
                <img src="" alt="" className="option-img" />
              </div>
            </div>
          </div>
          <input type="chose" className="title-view-order" />
        </div>
        <div className="title-text-info">
          <span className="title-name">Залупа дьявола</span>
          <div className="title-alt-names">
            <span className="title-alt-name">Diablo de zaluppo</span>
          </div>
          <span className="title-genre">Жанры: яой, гей, фурри</span>
          <span className="title-year">Год: 1337</span>
          <span className="title-status">Статус: В разработке</span>
          <span className="title-type">Тип: Блицкриг</span>
          <span className="title-ep">Количество серий: 13/37</span>
          <span className="title-dub">
            Озвучки: МояМама, твояMatre, Jam, StudioBand
          </span>
          <span className="title-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
            quis quae accusamus numquam labore ea deleniti cumque. Delectus,
            dolorum officia? Nisi voluptates magni inventore iure labore quidem
            debitis, ab placeat. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Hic sapiente eos ducimus quo reiciendis inventore
            a? Eum ratione sit, repellat odio sunt esse fugit quaerat saepe
            deserunt facere itaque atque. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Hic sapiente eos ducimus quo
            reiciendis inventore a? Eum ratione sit, repellat odio sunt esse
            fugit quaerat saepe deserunt facere itaque atque.
          </span>
        </div>
      </div>
      <div className="player-wraper">
        <div className="title-header">
          <span className="header-tab just-player">Плеер</span>
          <span className="header-tab player-chose">
            <div className="player-name">Sibnet</div>
            <div className="little-dievider" />
            <img src={Arrow} alt="menu-arrow" />
          </span>
          <span className="header-tab player-chose">
            <div className="player-name">Anilibria</div>
            <div className="little-dievider" />
            <img src={Arrow} alt="menu-arrow" />
          </span>
        </div>
        <div className="player">
          <iframe
            title="asdsad"
            src="//kodik.biz/seria/1194775/4dc182c777a94d28c0029339196640e2/720p"
            allow="autoplay *; fullscreen *"
            key="asdasd"
            className="player"
          />
        </div>
        <div className="episode-wraper">
          <span className="episode">1</span>
          <span className="episode">2</span>
          <span className="episode">3</span>
          <span className="episode">4</span>
          <span className="episode active">5</span>
          <span className="episode">6</span>
          <span className="episode">7</span>
          <span className="episode">8</span>
          <span className="episode">9</span>
          <span className="episode">10</span>
          <span className="episode">11</span>
          <span className="episode">12</span>
        </div>
      </div>
      <div className="comments-wraper">
        <div className="title-header">
          <span className="header-tab just-player">Комментарии</span>
        </div>
        <div className="comments-input">
          <div className="comments-styles">
            <img src={Bold} alt="bold" className="style" />
            <img src={Italic} alt="italic" className="style" />
            <img src={Underline} alt="underline" className="style" />
            <img src={LineThrough} alt="linethrough" className="style" />
            <img src={OrderedList} alt="ordered list" className="style" />
            <img src={UnorderedList} alt="unordered list" className="style" />
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
        <div className="comments">
          <div className="comment">
            <img src="" alt="" />
            <h3 className="comment-name">Hitler</h3>
            <span className="comment-date">03.09.1422</span>
            <span className="comment-body">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
              rerum maiores amet tempora error magni sequi dolores asperiores,
              labore dignissimos, eligendi magnam delectus perferendis tempore
              voluptates quaerat reiciendis esse voluptate?
            </span>
            <div className="devider-vertical-long" />
            <div className="comment-rating-wraper">
              <img src="" alt="" className="arrow arrow-up" />
              <span className="comment-rating up">12</span>
              <img src="" alt="" className="arrow arrow-down" />
            </div>
          </div>
          <div className="comment">
            <img src="" alt="" />
            <h3 className="comment-name">Hitler</h3>
            <span className="comment-date">03.09.1422</span>
            <span className="comment-body">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
              rerum maiores amet tempora error magni sequi dolores asperiores,
              labore dignissimos, eligendi magnam delectus perferendis tempore
              voluptates quaerat reiciendis esse voluptate?
            </span>
            <div className="devider-vertical-long" />
            <div className="comment-rating-wraper">
              <img src="" alt="" className="arrow arrow-up" />
              <span className="comment-rating up">12</span>
              <img src="" alt="" className="arrow arrow-down" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TitlePage;
