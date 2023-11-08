import React from "react";
import { createPortal } from "react-dom";
import "./Feedback.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleFeedbeackAction } from "../../redux/feedbackSlice";
import { FeedbackDto } from "../../types/feedbackDto";
import FeedbackIcon from "../img/feedback-svgrepo-com.svg";

export default function FeedbackButton() {
  const dispatch = useDispatch();
  const feedbackState = useSelector(
    (state: { feedback: FeedbackDto }) => state.feedback.isFeedbackOpen
  );
  return createPortal(
    feedbackState ? (
      <div className="feedback-button-wrapper">
        <button className="feedback-button" type="button" disabled>
          Открыть окно обратной связи
          <img src={FeedbackIcon} alt="" className="feedback-button-img" />
        </button>
      </div>
    ) : (
      <div className="feedback-button-wrapper">
        <button
          className="feedback-button"
          type="button"
          onClick={() => {
            dispatch(toggleFeedbeackAction(true));
            window.scrollTo({ behavior: "smooth", top: 0 });
          }}
        >
          Открыть окно обратной связи
          <img src={FeedbackIcon} alt="" className="feedback-button-img" />
        </button>
      </div>
    ),
    document.body
  );
}
