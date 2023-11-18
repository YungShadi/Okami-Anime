import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addErrorAction } from "../../redux/errorSlice";

import Vk from "../img/basil_vk-solid.svg";
import Telegram from "../img/mingcute_telegram-fill.svg";
import Discord from "../img/ic_baseline-discord.svg";

// import { ErrorDto } from "../../types/errorDto";

function Footer() {
  // mb somehow i can display it always on bottom, but with position abolute
  // its only at bottom if page dont have scroll

  // const amountOfErrors = useSelector(
  //   (state: { error: ErrorDto }) => state.error.amountOfErrors
  // );
  // const dispatch = useDispatch();
  return (
    <footer className="footer">
      <span className="footer-worning">
        Контент на сайте представлен в ознакомительных целях
      </span>
      <div className="footer-content">
        <div className="footer-links">
          <a className="link link-vk" href="our.vk">
            <img src={Vk} alt="vkontakte" />
          </a>
          <a className="link link-tg" href="our.tg">
            <img src={Telegram} alt="telegram" />
          </a>
          <a className="link link-dis" href="our.dis">
            <img src={Discord} alt="discord" />
          </a>
        </div>
        <span className="email">
          <a
            className="email-link"
            href="mailto:animeokamidev@gmail.com&body=привет"
          >
            animeokamidev@gmail.com
          </a>
        </span>
        <div className="copyrigth">
          <span className="copyrigth-year">©️ 2023</span>
          <Link className="copyrigth-info" to="copyright">
            Информация для правообладателей
          </Link>
        </div>
      </div>
      {/* <button
        type="button"
        onClick={() => {
          dispatch(
            addErrorAction({
              statusCode: Math.floor(Math.random() * 1000),
              errorMessage: "Some Error Zaglushka",
              index: amountOfErrors,
            })
          );
        }}
      >
        add error
      </button> */}
    </footer>
  );
}

export default Footer;
