import React, { useState } from "react";
import DefaultProfPicture from "../../img/Аватар.png";

export default function Comment() {
  const [showFullComment, setShowFullComment] = useState(false);
  const commentText = `*Lorem ipsum dolor* sit amet _consectetur adipisicing_ elit. **Explicabo, maxime impedit!** Maiores, laudantium. __Nulla__ id quas hic illum quod cupiditate voluptates veniam similique magni animi voluptatum autem consequatur, accusantium soluta.
  ~s Наруто s~
  1. Наруто
  2. Саске\n
  3. Сакура
  

  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, maxime impedit! Maiores, laudantium. Nulla id quas hic illum quod cupiditate voluptates veniam similique magni animi voluptatum autem consequatur, accusantium soluta.

  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, maxime impedit! Maiores, laudantium. Nulla id quas hic illum quod cupiditate voluptates veniam similique magni animi voluptatum autem consequatur, accusantium soluta.
  `;

  // eslint-disable-next-line no-extend-native
  String.prototype.replaceMultiple = function () {
    let v = this;
    [...arguments].forEach((arg) => (v = v.replace(arg[0], arg[1])));
    return v;
  };

  const formatComment = commentText.replaceMultiple(
    [/(?<!\*)\*([^*]+)\*(?!\*)/gm, "<b>$1</b>"], // Bold
    [/(?<!_)_([^_]+)_(?!_)/gm, "<i>$1</i>"], // Italic
    [/\*\*([^*]+)\*\*/gm, "<s>$1</s>"], // Strikethrough
    [/__([^__]+)__/gm, "<u>$1</u>"], // underline
    [/~s([^~s]+)s~/gm, `<div class=spoiler>$1</div>`],
  );
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
          <div className={`comment-text ${showFullComment ? "show-full" : ""}`}>
            {/* {commentText.split("\n").map((paragraph) => (
              <p>{paragraph}</p>
            ))} */}
            <p dangerouslySetInnerHTML={{ __html: formatComment }} />
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
