import React from "react";
import "./footer.css";

import Vk from "../img/basil_vk-solid.svg";
import Telegram from "../img/mingcute_telegram-fill.svg";
import Discord from "../img/ic_baseline-discord.svg";

function Footer() {
  return (
    <footer className="footer">
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
        <a className="email-link" href="email">
          kakashki@anime.ru
        </a>
      </span>
      <div className="copyrigth">
        <span className="copyrigth-year">©️ 2023</span>
        <span className="copyrigth-info">Информация для правообладателей</span>
      </div>
    </footer>
  );
}

export default Footer;
