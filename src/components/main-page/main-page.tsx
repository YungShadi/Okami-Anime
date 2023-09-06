import React from "react";
import Title from "../title";

import "./main-page.css";

// ! В будущем, при получении данных о тайтлах и переходе в конкертный если о нем есть данные в state
// ! то лучше брать их. если нет - посылаем запрос по id в ссылке

type TitleType = {
  titleStatus: string;
  titleAgeRest: string;
  titleName: string;
  titleTags: string[];
};

function MainPage() {
  const titlesArray: TitleType[] = [
    {
      titleStatus: "Еблан",
      titleAgeRest: "21+",
      titleName: "Обьебос",
      titleTags: ["gay", "porn", "suck"],
    },
    {
      titleStatus: "Еблан",
      titleAgeRest: "21+",
      titleName: "Обьебос",
      titleTags: ["gay", "porn", "suck"],
    },
    {
      titleStatus: "Еблан",
      titleAgeRest: "21+",
      titleName: "Обьебос",
      titleTags: ["gay", "porn", "suck"],
    },
    {
      titleStatus: "Еблан",
      titleAgeRest: "21+",
      titleName: "Обьебос",
      titleTags: ["gay", "porn", "suck"],
    },
    {
      titleStatus: "Еблан",
      titleAgeRest: "21+",
      titleName: "Обьебос",
      titleTags: ["gay", "porn", "suck"],
    },
    {
      titleStatus: "Еблан",
      titleAgeRest: "21+",
      titleName: "Обьебос",
      titleTags: ["gay", "porn", "suck"],
    },
  ];

  return (
    <section className="main">
      <div className="season-anime">
        <h2 className="season-anime-title">Аниме сезона</h2>
        <div className="season-titles">
          {titlesArray.slice(0, 6).map((title) => (
            <Title
              titleName={title.titleName}
              titleAgeRest={title.titleAgeRest}
              titleStatus={title.titleStatus}
              titleTags={title.titleTags}
            />
          ))}
        </div>
        <div className="devider" />
      </div>
      <div className="recently-added-anime">
        <h2 className="recetly-added-title">Недавно добавленные</h2>
        <div className="recently-added-titles">
          {titlesArray.map((title) => (
            <Title
              titleName={title.titleName}
              titleAgeRest={title.titleAgeRest}
              titleStatus={title.titleStatus}
              titleTags={title.titleTags}
            />
          ))}
        </div>
      </div>
      <div className="devider" />
    </section>
  );
}

export default MainPage;
