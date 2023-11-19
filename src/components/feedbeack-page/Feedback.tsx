/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { toggleFeedbeackAction } from "../../redux/feedbackSlice";

import "./Feedback.css";

export default function Feedback() {
  const [addCurrentUrl, setAddCurrentUrl] = useState(false);
  const [textAreaContent, setTextAreaContent] = useState("");
  const currentUrl = window.location.href;

  useEffect(() => {
    if (addCurrentUrl) {
      setTextAreaContent(`${textAreaContent.trim()} url: ${currentUrl}`);
    } else {
      setTextAreaContent(textAreaContent.replace(`url: ${currentUrl}`, ""));
    }
  }, [addCurrentUrl]);

  const dispatch = useDispatch();

  return createPortal(
    <>
      <div className="feedback-modal">
        <div className="feedback">
          <h2 className="feedback-titile">Отпраить сообщение разработчикам</h2>
          <span className="txt-prt">
            Случлилась какая-то ошибка? Или появились предложения по
            усовершенстовованнию сайта?
          </span>
          <span className="txt-prt">
            Или же просто захотелось оставить какой-то комментарий, что-то
            спросить или сказать нам.
          </span>
          <span className="txt-prt">
            Здесь вы можете это сделать. Мы обязательно прочтем сообщение и,
            возможно, что-то измениться благодаря вам.
          </span>
          <span className="txt-prt">
            P.S{" "}
            <p className="txt-prt" style={{ fontSize: "12px" }}>
              Просим обойтись без оскарблени и не налегать на нецензурную
              лексику, нам такое не нравиться и вы можете понести соответсвующее
              наказание :)
            </p>
          </span>
          <div className="feedback-add-url">
            <label htmlFor="feedback-url">
              <input
                type="checkbox"
                name="link"
                id="feedback-url"
                onChange={() => setAddCurrentUrl(!addCurrentUrl)}
              />
              Добавить ссылку на текущую страницу?
            </label>
          </div>
          <textarea
            className="feedback-textarea"
            placeholder="Текст"
            value={textAreaContent}
            onChange={(e) => setTextAreaContent(e.target.value)}
          />
          <button type="button">Отправить</button>
        </div>
      </div>
      <div
        className="background"
        onClick={() => dispatch(toggleFeedbeackAction(false))}
      />
    </>,
    document.body,
  );
}
