/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFeedbeackAction } from "../../redux/feedbackSlice";
import { FeedbackDto } from "../../types/feedbackDto";

import "./Feedback.css";

export default function Feedback() {
  const dispatch = useDispatch();

  const [addCurrentUrl, setAddCurrentUrl] = useState(false);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [isShowing, setIsShowin] = useState(true);
  const feedbackState = useSelector(
    (state: { feedback: FeedbackDto }) => state.feedback.isFeedbackOpen,
  );
  const currentUrl = window.location.href;
  const closeFeedback = () => {
    setIsShowin(false);
    setTimeout(() => {
      dispatch(toggleFeedbeackAction(false));
    }, 300);
  };

  useEffect(() => {
    if (addCurrentUrl) {
      setTextAreaContent(`${textAreaContent.trim()} url: ${currentUrl}`);
    } else {
      setTextAreaContent(textAreaContent.replace(`url: ${currentUrl}`, ""));
    }
  }, [addCurrentUrl]);

  // const handleEscClose = (e) => {
  //   console.log(e.key);
  // };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") closeFeedback();
    };

    if (feedbackState) {
      window.addEventListener("keydown", handleEscClose);
    }

    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [feedbackState]);

  return createPortal(
    <>
      <div className="feedback-modal">
        <div className={`feedback ${isShowing ? "" : "hide"}`}>
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
      <div className="background" onClick={() => closeFeedback()} />
    </>,
    document.body,
  );
}
