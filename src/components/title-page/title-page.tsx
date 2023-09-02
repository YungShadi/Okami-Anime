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

interface OptionTitle {
  title: string;
  state: string;
  img: React.JSX.Element;
}

function TitlePage() {
  const [triggerToggle, setTriggerToggle] = useState(false);
  const [selectState, setSelectState] = useState("Добавить в список");
  const [triggerContent, setTriggerContent] = useState(
    <div className="trigger-content">Добавить в список</div>
  );
  const [triggerOrder, setTriggerOrder] = useState(false);
  const [triggerPlayer, setTriggerPlayer] = useState(false);
  // const [triggerDub, setTriggerDub] = useState(false);

  const selsectOptions: Array<OptionTitle> = [
    {
      title: "Буду смотреть",
      state: "willWatch",
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="28"
          viewBox="0 0 25 28"
          fill="white"
          className="option-img"
        >
          <path
            d="M22.2222 0H4.16667C2.49167 0 0 1.1186 0 4.2V23.8C0 26.8814 2.49167 28 4.16667 28H25V25.2H4.18333C3.54167 25.1832 2.77778 24.927 2.77778 23.8C2.77778 23.6586 2.79028 23.5326 2.81111 23.4178C2.96667 22.6128 3.62083 22.414 4.18194 22.4H23.6111C23.6361 22.4 23.6542 22.3874 23.6792 22.386H25V2.8C25 1.2558 23.7542 0 22.2222 0ZM22.2222 19.6H2.77778V4.2C2.77778 3.0716 3.54167 2.8168 4.16667 2.8H13.8889V12.6L16.6667 11.2L19.4444 12.6V2.8H22.2222V19.6Z"
            fill="#fff"
          />
        </svg>
      ),
    },
    {
      title: "Просмотренно",
      state: "wathced",
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="37"
          height="19"
          viewBox="0 0 37 19"
          fill="none"
          className="option-img"
        >
          <path
            d="M23.5539 10.5108L25.1 17M2 2C2 2 7.775 11.2308 18.5 11.2308C29.225 11.2308 35 2 35 2H2ZM5.3 5.79615L2 11.2308L5.3 5.79615ZM35 11.2308L31.7066 5.80308L35 11.2308ZM13.4081 10.4923L11.9 17L13.4081 10.4923Z"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      title: "Смотрю",
      state: "watching",
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="43"
          height="32"
          viewBox="0 0 43 32"
          fill="none"
          className="option-img"
        >
          <path
            d="M37.3898 13.3689C38.2034 14.3431 38.2034 15.6584 37.3898 16.6311C34.8271 19.6939 28.6786 26 21.5003 26C14.3219 26 8.17345 19.6939 5.61073 16.6311C5.21488 16.1646 5 15.5907 5 15C5 14.4093 5.21488 13.8354 5.61073 13.3689C8.17345 10.3061 14.3219 4 21.5003 4C28.6786 4 34.8271 10.3061 37.3898 13.3689V13.3689Z"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M21.5 21C25.0899 21 28 18.3137 28 15C28 11.6863 25.0899 9 21.5 9C17.9101 9 15 11.6863 15 15C15 18.3137 17.9101 21 21.5 21Z"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      title: "Брошено",
      state: "drop",
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="32"
          viewBox="0 0 36 32"
          fill="none"
          className="option-img"
        >
          <path
            d="M21.2 14.6V21.6M5.2 7.6H30.8L28.272 27.508C28.1853 28.1931 27.8129 28.8262 27.226 29.286C26.6391 29.7458 25.879 30 25.0912 30H10.9088C10.121 30 9.3609 29.7458 8.774 29.286C8.18709 28.8262 7.81466 28.1931 7.728 27.508L5.2 7.6ZM10.552 3.6058C10.8108 3.12555 11.2203 2.7196 11.7328 2.43528C12.2453 2.15095 12.8396 1.99999 13.4464 2H22.5536C23.1607 1.99973 23.7553 2.15056 24.2681 2.4349C24.7809 2.71924 25.1907 3.12534 25.4496 3.6058L27.6 7.6H8.4L10.552 3.6058V3.6058ZM2 7.6H34H2ZM14.8 14.6V21.6V14.6Z"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      title: "Любимое",
      state: "loved",
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          className="option-img"
        >
          <path
            d="M23.925 0C21.054 0 18.2985 1.41253 16.5 3.64469C14.7015 1.41253 11.946 0 9.075 0C3.993 0 0 4.22016 0 9.59128C0 16.1831 5.61 21.5542 14.1075 29.7155L16.5 32L18.8925 29.6981C27.39 21.5542 33 16.1831 33 9.59128C33 4.22016 29.007 0 23.925 0ZM16.665 27.1172L16.5 27.2916L16.335 27.1172C8.481 19.6011 3.3 14.6311 3.3 9.59128C3.3 6.10354 5.775 3.48774 9.075 3.48774C11.616 3.48774 14.091 5.21417 14.9655 7.60327H18.051C18.909 5.21417 21.384 3.48774 23.925 3.48774C27.225 3.48774 29.7 6.10354 29.7 9.59128C29.7 14.6311 24.519 19.6011 16.665 27.1172Z"
            fill="white"
          />
        </svg>
      ),
    },
  ];
  useEffect(() => {
    selsectOptions.find((option) => {
      if (selectState === option.state) {
        const { xmlns, width, heigth, viewBox } = option.img.props;
        setTriggerContent(
          <>
            <div className="option-content">{option.title}</div>
            <div className="option-line" />
            <svg
              xmlns={xmlns}
              width={width}
              height={heigth}
              viewBox={viewBox}
              fill={selectState !== "watching" ? "#3CE3E8" : "none"}
              className="option-img"
              style={{ fill: "none" }}
            >
              {option.state !== "watching" ? (
                <path
                  d={option.img.props.children.props.d}
                  fill={
                    option.img.props.children.props.fill === "none"
                      ? "none"
                      : "#3CE3E8"
                  }
                  stroke="#3CE3E8"
                  strokeWidth={option.img.props.children.props.strokeWidth}
                  strokeLinecap={option.img.props.children.props.strokeLinecap}
                  strokeLinejoin={
                    option.img.props.children.props.strokeLinejoin
                  }
                />
              ) : (
                <>
                  <path
                    d="M37.3898 13.3689C38.2034 14.3431 38.2034 15.6584 37.3898 16.6311C34.8271 19.6939 28.6786 26 21.5003 26C14.3219 26 8.17345 19.6939 5.61073 16.6311C5.21488 16.1646 5 15.5907 5 15C5 14.4093 5.21488 13.8354 5.61073 13.3689C8.17345 10.3061 14.3219 4 21.5003 4C28.6786 4 34.8271 10.3061 37.3898 13.3689V13.3689Z"
                    stroke="#3CE3E8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.5 21C25.0899 21 28 18.3137 28 15C28 11.6863 25.0899 9 21.5 9C17.9101 9 15 11.6863 15 15C15 18.3137 17.9101 21 21.5 21Z"
                    stroke="#3CE3E8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}
            </svg>
          </>
        );
      }
      return 0;
    });
    if (triggerToggle) setTriggerToggle(!triggerToggle);
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
              type="button"
              onClick={showOptions}
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
              {selsectOptions.map(
                (option) =>
                  selectState !== option.state && (
                    <button
                      className="option"
                      type="button"
                      onClick={() => setSelectState(option.state)}
                    >
                      <div className="option-content">{option.title}</div>
                      <div className="option-line" />
                      {option.img}
                    </button>
                  )
              )}
              <div className="option">
                <div className="option-content" style={{ color: "#FF0900" }}>
                  Удалить
                </div>
                <div className="option-line" />
                <img src="" alt="" className="option-img" />
              </div>
            </div>
          </div>
          <div className="view-order-wraper">
            <button
              className="view-order-trigger"
              type="button"
              onClick={() => setTriggerOrder(!triggerOrder)}
            >
              Порядок просмотра
            </button>
            <ol
              className="view-order-list"
              style={{
                height: triggerOrder ? "150px" : "0",
                display: "block",
              }}
              type="1"
            >
              <li className="view-oreder-element current">Ангел кала 1</li>
              <li className="view-oreder-element">Ангел кала 3</li>
              <li className="view-oreder-element">Ангел кала 1232</li>
              <li className="view-oreder-element">
                Ангел кала: Невообразимый кал
              </li>
            </ol>
          </div>
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
          <div className="player-chose-wraper">
            <button
              className="header-tab player-chose"
              type="button"
              onClick={() => setTriggerPlayer(!triggerPlayer)}
            >
              <div className="player-name">Sibnet</div>
              <div className="little-dievider" />
              <img
                src={Arrow}
                alt="menu-arrow"
                style={{
                  transform: triggerPlayer ? "rotate(-90deg)" : "none",
                  transition: "0.5s",
                }}
              />
            </button>
            <div
              className="player-options"
              style={{ height: triggerPlayer ? "100px" : "0" }}
            >
              <div className="player-option">Kodik</div>
              <div className="player-option">ААААААА</div>
            </div>
          </div>
          <button className="header-tab dub-chose" type="button">
            <div className="dub-name">Anilibria</div>
            <div className="little-dievider" />
            <img src={Arrow} alt="menu-arrow" />
          </button>
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
