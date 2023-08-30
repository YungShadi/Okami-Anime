import React from "react";
import Poster from "../img/Постер.png";
import "./title-page.css";
import Arrow from "../img/mdi_menu-down.svg";
import PlayerPlaceholder from "../img/Плеер.png";
import Bold from "../img/ant-design_bold-outlined.svg";
import Italic from "../img/ant-design_italic-outlined.svg";
import Underline from "../img/ant-design_underline-outlined.svg";
import LineThrough from "../img/ant-design_strikethrough-outlined.svg";
import OrderedList from "../img/ant-design_ordered-list-outlined.svg";
import UnorderedList from "../img/ant-design_unordered-list-outlined.svg";

function TitlePage() {
  return (
    <div className="title">
      <div className="title-info">
        <div className="poster-wraper">
          <img className="title-poster" alt="poster" src={Poster} />
          <input type="chose" className="title-chose-condition" />
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
        </div>
      </div>
      <span className="title-desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
        quis quae accusamus numquam labore ea deleniti cumque. Delectus, dolorum
        officia? Nisi voluptates magni inventore iure labore quidem debitis, ab
        placeat. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
        sapiente eos ducimus quo reiciendis inventore a? Eum ratione sit,
        repellat odio sunt esse fugit quaerat saepe deserunt facere itaque
        atque. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
        sapiente eos ducimus quo reiciendis inventore a? Eum ratione sit,
        repellat odio sunt esse fugit quaerat saepe deserunt facere itaque
        atque.
      </span>
      <input type="chose" className="title-view-order" />
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
          <img
            src={PlayerPlaceholder}
            alt="player-placeholder"
            className="player-placeholder"
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
          <input
            type="text"
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
