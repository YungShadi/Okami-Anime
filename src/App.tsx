import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";

import DefaultPoster from "./components/img/poster.png";
import "./app.css";

function App() {
  const title = (
    <div className="season-title">
      <span className="title-status">Онгоинг</span>
      <span className="title-age-rest">69+</span>
      <img className="title-poster" src={DefaultPoster} alt="poster" />
      <span className="title-name">Одаривая этот замок хуем по лбу</span>
      <div className="title-tags">
        <span className="tag">Порно</span>
      </div>
    </div>
  );
  return (
    <div className="okami">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/catalogue" element={<Header />} />
      </Routes>
      <div className="season-anime">
        <h2 className="season-anime-title">Аниме сезона</h2>
        <div className="season-titles">
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
        </div>
        <div className="devider" />
      </div>
    </div>
  );
}

export default App;
