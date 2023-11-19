/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Comment from "./comment";
import Bold from "../../img/ant-design_bold-outlined.svg";
import Italic from "../../img/ant-design_italic-outlined.svg";
import Underline from "../../img/ant-design_underline-outlined.svg";
import LineThrough from "../../img/ant-design_strikethrough-outlined.svg";
import OrderedList from "../../img/ant-design_ordered-list-outlined.svg";
import UnorderedList from "../../img/ant-design_unordered-list-outlined.svg";
import Spolier from "../../img/spoiler_n6na0nz67dhu.svg";
import Image from "../../img/imageIcon.svg";
import Qoute from "../../img/qouteIcon.svg";

export default function CommentsWraper() {
  const [commentValue, setCommentValue] = useState("");

  const handleTextStyle = (style: string) => {
    switch (style) {
      case "bold":
        return setCommentValue(`${commentValue}** **`);
      case "italic":
        return setCommentValue(`${commentValue}_ _`);
      case "underline":
        return setCommentValue(`${commentValue}__ __`);
      case "linethrough":
        return setCommentValue(`${commentValue}~~ ~~`);
      case "orderedList":
        return setCommentValue(`${commentValue}\n1.Элемент\n2.Элемент`);
      case "unorderedList":
        return setCommentValue(`${commentValue}\n*Элемент\n*Элемент`);
      case "qoute":
        return setCommentValue(`${commentValue}\n>Цитата`);
      case "spoiler":
        return setCommentValue(`${commentValue}[s][/s]`);
      case "link-img":
        return setCommentValue(
          `${commentValue}![Image](сюда ссылку на картинку)`,
        );

      default:
        return null;
    }
  };
  return (
    <div className="comments-wraper">
      <div className="title-header">
        <span className="header-tab just-player">Комментарии</span>
      </div>
      <div className="comments-input">
        {/* styles for comment */}
        <div
          className="comments-styles"
          onClick={(e) => handleTextStyle(e.target.alt)}
        >
          <img src={Bold} alt="bold" className="style" title="Жирный" />
          <img src={Italic} alt="italic" className="style" title="Курсив" />
          <img
            src={Underline}
            alt="underline"
            className="style"
            title="Подчеркнутый"
          />
          <img
            src={LineThrough}
            alt="linethrough"
            className="style"
            title="Зачеркнутый"
          />
          <img
            src={OrderedList}
            alt="orderedList"
            className="style"
            title="Номерованный список"
          />
          <img
            src={UnorderedList}
            alt="unorderedList"
            className="style"
            title="Неномированный список"
          />
          <img src={Qoute} alt="qoute" className="style" title="Цитата" />
          <img
            src={Spolier}
            alt="spoiler"
            className="style spoiler"
            title="Спойлер"
          />
          <img
            src={Image}
            alt="link-img"
            className="style"
            title="Ссылка на картинку"
          />
        </div>
        <textarea
          className="comment-input"
          placeholder="Напишите ваш коммнтарий"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        <Link to="markdown">Markdown подсказка</Link>
      </div>
      <button className="comment-send" type="button">
        Отправить комментарий
      </button>
      <div className="devider-line-long" />
      {/* comments */}
      <Comment />
    </div>
  );
}
