import React from "react";
import { TitleDto } from "../../types/titleDto";
import Title from "../title";
import Metadata from "../Metadata";
import SkeletonTitle from "../SkeletonTitle/SkeletonTitle";
import Reklama from "../img/Безымянный.png";

import "./main-page.css";
import { useGetTitlesQuery } from "../../redux/service/anime/titles.api";

function MainPage() {
  const { data: titles, status: titlesLoadStatus } = useGetTitlesQuery({
    search: "",
    page: 0,
  });

  return (
    <>
      <Metadata
        title="ŌkamiAnime"
        description="Ваш источник увлекательных аниме! Смотрите бесплатно лучшие аниме онлайн на нашем сайте. Огромная коллекция анимационных шедевров!"
        url={window.location.href}
      />
      <section className="main" style={{ flexGrow: "1" }}>
        <div className="season-anime">
          <h2 className="season-anime-title">Аниме сезона</h2>
          <div className="season-titles">
            {titlesLoadStatus === "fulfilled" ? (
              titles.content
                .slice(0, 6)
                .map((title: TitleDto) => (
                  <Title
                    titleClass="season-title"
                    titleData={title}
                    key={title.id}
                  />
                ))
            ) : (
              <>
                {Array.from({ length: 6 }, (_, index) => (
                  <SkeletonTitle key={index} />
                ))}
              </>
            )}
          </div>
          <div className="devider" />
        </div>
        <div className="recently-added-anime">
          <h2 className="recetly-added-title">Недавно добавленные</h2>
          <div className="recently-added-titles">
            {titlesLoadStatus === "fulfilled" ? (
              titles.content.map((title: TitleDto) => (
                <Title
                  titleClass="recently-added"
                  titleData={title}
                  key={title.id}
                />
              ))
            ) : (
              <>
                {Array.from({ length: 18 }, (_, index) => (
                  <SkeletonTitle key={index} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="devider" />
        <img src={Reklama} alt="" className="ad" />
      </section>
    </>
  );
}

export default MainPage;
