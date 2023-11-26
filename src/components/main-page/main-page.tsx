import React, { useEffect, useState } from "react";
import Title from "../Title";
import { useTitles } from "../../hooks/useTitles";
import "./main-page.css";
import { TitleDto } from "../../types/titleDto";
import Reklama from "../img/Безымянный.png";
import SkeletonTitle from "../SkeletonTitle/SkeletonTitle";

function MainPage() {
  const { isTitlesLoadingLazy, handleGetTitles, titlesLoadStatus } =
    useTitles();

  const [displayedTitles, setDisplayedTitles] = useState([]);

  useEffect(() => {
    handleGetTitles(0, "").then((res) => {
      setDisplayedTitles(res.data.content || []);
    });
  }, []);
  useEffect(() => {
    console.log(isTitlesLoadingLazy, titlesLoadStatus);
  }, [isTitlesLoadingLazy, titlesLoadStatus]);
  // TODO Надо подумать над кэшированием
  return (
    <section className="main" style={{ flexGrow: "1" }}>
      <div className="season-anime">
        <h2 className="season-anime-title">Аниме сезона</h2>
        <div className="season-titles">
          {titlesLoadStatus === "fulfilled" ? (
            displayedTitles
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
            displayedTitles.map((title: TitleDto) => (
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
  );
}

export default MainPage;
