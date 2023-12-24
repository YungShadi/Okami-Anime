/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Comment } from "./comment";

import Bold from "../../img/ant-design_bold-outlined.svg";
import Italic from "../../img/ant-design_italic-outlined.svg";
import Underline from "../../img/ant-design_underline-outlined.svg";
import LineThrough from "../../img/ant-design_strikethrough-outlined.svg";
import OrderedList from "../../img/ant-design_ordered-list-outlined.svg";
import UnorderedList from "../../img/ant-design_unordered-list-outlined.svg";
import Spolier from "../../img/spoiler_n6na0nz67dhu.svg";
import Image from "../../img/imageIcon.svg";
import Qoute from "../../img/qouteIcon.svg";

function CommentsWraperComponent() {
  const [commentValue, setCommentValue] = useState("");
  // TODO как реализовать стилизацию комментариев? скорее всего надо самомоу написать че-то типо bbcode
  const handleTextStyle = (style: string) => {
    switch (style) {
      case "bold":
        return setCommentValue(`${commentValue}[b] [/b]`);
      case "italic":
        return setCommentValue(`${commentValue}[i] [/i]`);
      case "underline":
        return setCommentValue(`${commentValue}[u] [/u]`);
      case "linethrough":
        return setCommentValue(`${commentValue}[s] [/s]`);
      case "orderedList":
        return setCommentValue(
          `${commentValue}\n[list=1]\n[*]Элемент\n[*]Элемент\n[/list]`,
        );
      case "unorderedList":
        return setCommentValue(
          `${commentValue}\n[list]\n[*]Элемент\n[*]Элемент[list]`,
        );
      case "qoute":
        return setCommentValue(`${commentValue}\n[quote] [/quote]`);
      case "spoiler":
        return setCommentValue(`${commentValue} [spoiler] [/spoiler]`);
      case "link-img":
        return setCommentValue(
          `${commentValue}[image]сюда ссылку на картинку[/image]`,
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
          onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) =>
            handleTextStyle((e.target as HTMLImageElement).alt)
          }
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
        <Link to="markdown">bbcode подсказка</Link>
      </div>
      <button className="comment-send" type="button">
        Отправить комментарий
      </button>
      <div className="devider-line-long" />
      {/* comments */}
      <div className="comments">
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
}
// eslint-disable-next-line import/prefer-default-export
export const CommentsWraper = React.memo(CommentsWraperComponent);
