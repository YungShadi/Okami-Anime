/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useDeferredValue, useEffect, useState } from "react";
import { useLocation /* {useParams} */ } from "react-router-dom";
import { toast } from "react-toastify";
import { useTitles } from "../../hooks/useTitles";
import { TitleDto } from "../../types/titleDto";
import Metadata from "../Metadata";
import { TitleData } from "./TitleData/titleData";
import { Player } from "./Player/player";
import { CommentsWraper } from "./Comments/commentsWraper";

import "./title-page.css";

function TitlePage() {
  const [titleData, setTitleData] = useState<TitleDto>({} as TitleDto);
  const defferedTitle = useDeferredValue(titleData);

  const location = useLocation();
  const linkState: TitleDto = location.state;
  const currentUrl = window.location.href;

  const { handleGetCurrentTitle, currentTitleStatus } = useTitles();

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
          }
        })
        .catch((e) => {
          toast.error("Не удалось получить");
          throw new Error(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleId]);
  useEffect(() => {
    console.log(currentTitleStatus);
  }, [currentTitleStatus]);

  if (currentTitleStatus === "fulfilled" || linkState) {
    return (
      <>
        <Metadata
          title={titleData.material_data?.title || ""}
          description={titleData.material_data?.anime_description || ""}
          url={currentUrl}
          image={titleData.material_data?.poster_url || ""}
        />
        <div className="title">
          <TitleData titleData={defferedTitle} />
          {/* player and player header */}
          <Player playerLink={defferedTitle.link} />
          {/* comments wraper, here post comments and comments */}
          <CommentsWraper />
        </div>
      </>
    );
  }
  return <p>Тайтл не найден</p>;
}

export default TitlePage;
