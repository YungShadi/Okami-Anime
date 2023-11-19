/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTitles } from "../../hooks/useTitles";
import { TitleDto } from "../../types/titleDto";
import TitleData from "./TitleData/titleData";
import Player from "./Player/player";
import CommentsWraper from "./Comments/commentsWraper";

import "./title-page.css";

function TitlePage() {
  const [titleData, setTitleData] = useState<TitleDto>({} as TitleDto);
  const [isThereError, setIsThereError] = useState(false);

  const location = useLocation();

  const { handleGetCurrentTitle } = useTitles();

  const titleId = location.search.replace("?", "");
  const params = useParams();
  console.log(params);

  useEffect(() => {
    handleGetCurrentTitle(titleId)
      .then((result) => {
        if (
          "data" in result &&
          result.data.results &&
          result.data.results.length > 0
        ) {
          setTitleData(result.data.results[0]);
          document.title = result.data.results[0].material_data.title;
        } else {
          setIsThereError(true);
        }
      })
      .catch(() => {
        setIsThereError(true);
      });
  }, [titleId]);

  // options for condition of title chose

  if (isThereError) {
    return <p>Тайтл не найден</p>;
  }

  return (
    <div className="title">
      <React.Suspense>
        {titleData.title && <TitleData titleData={titleData} />}
        {/* player and player header */}
        <Player playerLink={titleData.link} />
        {/* comments wraper, here post comments and comments */}
        {titleData.title && <CommentsWraper />}
      </React.Suspense>
    </div>
  );
}

export default TitlePage;
