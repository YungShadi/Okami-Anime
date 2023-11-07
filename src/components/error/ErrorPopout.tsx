/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import "./ErrorPopout.css";
import { removeErrorAction } from "../../redux/errorSlice";

function ErrorPopout({
  errorM,
  errorCode,
  index,
}: {
  errorM: string;
  errorCode: number;
  index: number;
}) {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        dispatch(removeErrorAction(index));
      }, 500);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [index, dispatch]);

  const height = `${10 + index * 60}px`;

  return createPortal(
    <div
      className={`error-popout ${isVisible ? "" : "disappear"}`}
      onClick={() => {
        setIsVisible(false);
        setTimeout(() => {
          dispatch(removeErrorAction(index));
        }, 500);
      }}
      style={{ bottom: height }}
    >
      <p>{errorM}</p>
      <p>{errorCode}</p>
    </div>,
    document.body
  );
}
export default ErrorPopout;