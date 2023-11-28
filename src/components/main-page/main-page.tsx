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
        description="Добро пожаловать на OkamiAnime - ваш идеальный онлайн-источник для бесплатного просмотра аниме! Наш виртуальный анимационный мир предлагает вам богатый выбор захватывающих аниме-сериалов и фильмов, доступных для просмотра в любое время. OkamiAnime предоставляет широкий спектр жанров, начиная от захватывающих приключений и фэнтези до трогательных романтических историй, чтобы удовлетворить вкусы каждого любителя аниме."
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
                    onClickHandle={() => console.log(1)}
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
                  onClickHandle={() => console.log(1)}
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
