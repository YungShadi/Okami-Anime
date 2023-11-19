import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Title from "../title";
import { useTitles } from "../../hooks/useTitles";
import "./main-page.css";
import { TitleDto } from "../../types/titleDto";
import Reklama from "../img/Безымянный.png";

// ! В будущем, при получении данных о тайтлах и переходе в конкертный если о нем есть данные в state
// ! то лучше брать их. если нет - посылаем запрос по id в ссылке

function MainPage() {
  const titles = useSelector((state) => state?.titles.titlesArray);
  // eslint-disable-next-line no-unused-vars
  useTitles();

  useEffect(() => {
    document.title = "ŌkamiAnime";
  }, []);

  return (
    <section className="main" style={{ flexGrow: "1" }}>
      <div className="season-anime">
        <h2 className="season-anime-title">Аниме сезона</h2>
        <div className="season-titles">
          {titles.slice(0, 6).map((title: TitleDto) => (
            <Title
              titleClass="season-title"
              titleFullName={title.title}
              titleName={title.material_data.title || title.title}
              titleAgeRest={title.material_data.rating_mpaa}
              titleStatus={title.material_data.anime_status}
              titleTags={title.material_data.anime_genres}
              titlePoster={title.material_data.poster_url}
              titleEpisodes={title.episodes_count}
              titleId={title.id}
              titleType={title.type}
            />
          ))}
        </div>
        <div className="devider" />
      </div>
      <div className="recently-added-anime">
        <h2 className="recetly-added-title">Недавно добавленные</h2>
        <div className="recently-added-titles">
          {titles.map((title: TitleDto) => (
            <Title
              titleClass="recently-added"
              titleFullName={title.title}
              titleName={title.material_data.title || title.title}
              titleAgeRest={title.material_data.rating_mpaa}
              titleStatus={title.material_data.anime_status}
              titleTags={title.material_data.anime_genres}
              titlePoster={title.material_data.poster_url}
              titleEpisodes={title.episodes_count}
              titleId={title.id}
              titleType={title.type}
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
