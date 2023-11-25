/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useLocation /* {useParams} */ } from "react-router-dom";
import { useTitles } from "../../hooks/useTitles";
import { TitleDto } from "../../types/titleDto";
// import TitleData from "./TitleData/titleData";
// import Player from "./Player/player";
// import CommentsWraper from "./Comments/commentsWraper";

import "./title-page.css";

function TitlePage() {
  const TitleData = lazy(() => import("./TitleData/titleData"));
  const Player = lazy(() => import("./Player/player"));
  const CommentsWraper = lazy(() => import("./Comments/commentsWraper"));

  const [titleData, setTitleData] = useState<TitleDto>({} as TitleDto);
  const [isThereError, setIsThereError] = useState(false);

  const location = useLocation();
  const linkState = location.state;

  const { handleGetCurrentTitle } = useTitles();

  const titleId = location.search.replace("?", "");
  // const params = useParams();

  useEffect(() => {
    if (linkState) {
      setTitleData(linkState);
    } else {
      handleGetCurrentTitle(titleId)
        .then((result) => {
          if ("data" in result) {
            setTitleData(result.data);
            document.title = result.data.material_data?.title;
          } else {
            setIsThereError(true);
          }
        })
        .catch(() => {
          setIsThereError(true);
        });
    }
  }, [titleId]);

  // options for condition of title chose

  if (isThereError) {
    return <p>Тайтл не найден</p>;
  }

  return (
    <div className="title">
      <Suspense>
        {titleData.title && (
          <>
            <TitleData titleData={titleData} />
            {/* player and player header */}
            <Player playerLink={titleData.link} />
            {/* comments wraper, here post comments and comments */}
            <CommentsWraper />
          </>
        )}
      </Suspense>
    </div>
  );
}

export default TitlePage;
