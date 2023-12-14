/* eslint-disable max-classes-per-file */
import React, { useState } from "react";
import paraser, { Tag } from "bbcode-to-react";
import DefaultProfPicture from "../../img/Аватар.png";
import Spoiler from "./spoiler";

export default function Comment() {
  const [showFullComment, setShowFullComment] = useState(false);
  const commentText = `[b]Lorem ipsum dolor[/b] sit amet [i]consectetur adipisicing[/i] elit. [s]Explicabo, maxime impedit![/s] Maiores, laudantium. [u]Nulla[/u] id quas hic illum quod cupiditate voluptates veniam similique magni animi voluptatum autem consequatur, accusantium soluta.
  [spoiler]Только сумасшедший ничего не боится. Воин знает, что такое страх, он чувствует его внутри себя, он осознает страх лучше, чем любой из смертных. И это делает нас сильными, — то, что мы победили страх, преодолели его не однажды — много раз! — пока процесс не стал инстинктивным. Но независимо от того, сколько сражений у вас позади и сколько побед вы одержали, ваш страх никогда не оставит вас полностью. Учитесь жить со страхом. Учитесь справляться с вашими страхами. Но никогда не забывайте, что есть вещи в этой Вселенной, с которыми даже вы не сможете примириться и жить; отвращение, настолько ужасное, что оно разрушит вашу плоть и иссушит глаза. Против таких вещей нельзя бороться, и попытка противостоять им будет лишь бесполезной утратой собственной жизни. В таких ситуациях помните ваши клятвы в служении Императору, и помните также, что вы служите Ему лучше всего живыми, а не жертвующими собственные жизни на алтарь тщетной славы…[/spoiler]
  [image]https://wallpapersmug.com/download/1024x768/504e9a/cute-anime-girl-happy.jpg[/image]

  [list]
  [*] Наруто
  [*] Саске
  [*] Сакура
  [/list]

  [list=1]
  [*]Click on the register menu
  [*]Enter your e-mail address
  [*]Create a password
  [*]Click on complete registration
  [/list]

  [quote="Хорус, Воитель, примарх легиона Лунных волков (Сыны Хоруса)"]…Пусть галактика горит огнём![/quote]
   consectetur adipisicing elit. Explicabo, maxime impedit! Maiores, laudantium. Nulla id quas hic illum quod cupiditate voluptates veniam similique magni animi voluptatum autem consequatur, accusantium soluta.

  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, maxime impedit! Maiores, laudantium. Nulla id quas hic illum quod cupiditate voluptates veniam similique magni animi voluptatum autem consequatur, accusantium soluta.
  `;
  class SpoilerTag extends Tag {
    toReact() {
      // eslint-disable-next-line react/no-this-in-sfc
      return <Spoiler spoilerText={this.getContent(true)} />;
    }
  }
  class ImageTag extends Tag {
    toReact() {
      // eslint-disable-next-line react/no-this-in-sfc
      return <img src={this.getContent(true)} alt="some-img-from-internet" />;
    }
  }
  paraser.registerTag("spoiler", SpoilerTag);
  paraser.registerTag("image", ImageTag);

  return (
    <>
      {/* comment map here */}
      <div className={`comment ${showFullComment ? "show-full" : ""}`}>
        <img src={DefaultProfPicture} alt="profile pic" className="prof-pic" />
        <div className="comment-content">
          <div className="comment-name-date">
            <div className="user-name">Chel</div>
            <div className="date"> 14.14.1321</div>
          </div>
          <div
            className={`comment-text  ${
              // eslint-disable-next-line no-nested-ternary
              commentText.length > 480
                ? showFullComment
                  ? "show-full"
                  : "hide"
                : ""
            }`}
          >
            {/* {commentText.split("\n").map((paragraph) => (
              <p>{paragraph}</p>
            ))} */}
            <p>{paraser.toReact(commentText)}</p>
          </div>
          <div className="comment-under-buttons">
            <a className="comment-answer" href="-">
              Ответить
            </a>
            {commentText.length > 480 && (
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
    </>
  );
}
