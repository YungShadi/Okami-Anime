import React, { useEffect, useState } from "react";
import Title from "../title";
import { useTitles } from "../../hooks/useTitles";
import "./main-page.css";
import { TitleDto } from "../../types/titleDto";
import Reklama from "../img/Безымянный.png";

// ! В будущем, при получении данных о тайтлах и переходе в конкертный если о нем есть данные в state
// ! то лучше брать их. если нет - посылаем запрос по id в ссылке

function MainPage() {
  const { isTitlesLoadingLazy, handleGetTitles } = useTitles();

  const [displayedTitles, setDisplayedTitles] = useState([]);

  useEffect(() => {
    handleGetTitles(0, "").then((res) => {
      setDisplayedTitles(res.data.content);
    });
  }, []);

  return (
    <section className="main" style={{ flexGrow: "1" }}>
      <div className="season-anime">
        <h2 className="season-anime-title">Аниме сезона</h2>
        <div className="season-titles">
          {!isTitlesLoadingLazy &&
            displayedTitles
              .slice(0, 6)
              .map((title: TitleDto) => (
                <Title
                  titleClass="season-title"
                  titleData={title}
                  key={title.id}
                />
              ))}
        </div>
        <div className="devider" />
      </div>
      <div className="recently-added-anime">
        <h2 className="recetly-added-title">Недавно добавленные</h2>
        <div className="recently-added-titles">
          {!isTitlesLoadingLazy &&
            displayedTitles.map((title: TitleDto) => (
              <Title
                titleClass="recently-added"
                titleData={title}
                key={title.id}
              />
            ))}
        </div>
      </div>
      <div className="devider" />
      <img src={Reklama} alt="" className="ad" />
    </section>
  );
}

export default MainPage;
