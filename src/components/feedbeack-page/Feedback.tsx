/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { createPortal } from "react-dom";
import "./Feedback.css";
import { useDispatch } from "react-redux";
import { toggleFeedbeackAction } from "../../redux/feedbackSlice";

export default function Feedback() {
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

          <textarea className="feedback-textarea" placeholder="Текст" />
          <button type="button">Отправить</button>
        </div>
      </div>
      <div
        className="background"
        onClick={() => dispatch(toggleFeedbeackAction(false))}
      />
    </>,
    document.body
  );
}
