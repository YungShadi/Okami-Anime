import React from "react";
import { Link } from "react-router-dom";
import DefaultPoster from "../img/poster.png";

function MainPage() {
  const title = (
    <div className="season-title title-main">
      <span className="title-status status">Онгоинг</span>
      <span className="title-age-rest age-rest">69+</span>
      <img className="title-poster poster" src={DefaultPoster} alt="poster" />
      <span className="title-name name">Одаривая этот замок хуем по лбу</span>
      <div className="title-tags tags">
        <span className="tag">Порно</span>
      </div>
    </div>
  );
  return (
    <section className="main">
      <div className="season-anime">
        <h2 className="season-anime-title">Аниме сезона</h2>
        <div className="season-titles">
          <Link
            to="/article"
            style={{
              fontStyle: "none",
              textDecoration: "none",
              color: "white",
            }}
          >
            {title}
          </Link>
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
        </div>
        <div className="devider" />
        <div className="recently-added-anime">
          <h2 className="recetly-added-title">Недавно добавленные</h2>
          <div className="recently-added-titles">
            {title}
            {title}
            {title}
            {title}
            {title}
            {title}
            {title}
            {title}
            {title}
            {title}
            {title}
            {title}
          </div>
        </div>
        <div className="devider" />
      </div>
    </section>
  );
}

export default MainPage;
