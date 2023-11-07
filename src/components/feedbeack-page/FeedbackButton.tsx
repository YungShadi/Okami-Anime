import React from "react";
import { createPortal } from "react-dom";
import "./Feedback.css";

export default function FeedbackButton() {
  return createPortal(
    <div className="feedback-button-wrapper">
      <button className="feedback-button" type="button">
        Открыть окно обратной связи
      </button>
    </div>,
    document.body
  );
}
