/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  Suspense,
  lazy,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { useLocation /* {useParams} */ } from "react-router-dom";
import { useTitles } from "../../hooks/useTitles";
import { TitleDto } from "../../types/titleDto";
import SkeletonTitlePage from "./skeletonTitlePage";
import Metadata from "../Metadata";

import "./title-page.css";

function TitlePage() {
  const TitleData = lazy(() => import("./TitleData/titleData"));
  const Player = lazy(() => import("./Player/player"));
  const CommentsWraper = lazy(() => import("./Comments/commentsWraper"));

  const [titleData, setTitleData] = useState<TitleDto>({} as TitleDto);
  const defferedTitle = useDeferredValue(titleData);
  const [isThereError, setIsThereError] = useState(false);

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
          } else {
            setIsThereError(true);
          }
        })
        .catch(() => {
          setIsThereError(true);
        });
    }
  }, [titleId]);

  useEffect(() => {
    console.log(currentTitleStatus);
  }, [currentTitleStatus]);

  if (isThereError) {
    return <p>Тайтл не найден</p>;
  }

  return (
    <>
      <Metadata
        title={titleData.material_data?.title || ""}
        description={titleData.material_data?.anime_description || ""}
        url={currentUrl}
        image={titleData.material_data?.poster_url || ""}
      />
      <div className="title">
        <Suspense>
          {defferedTitle || currentTitleStatus === "fulfilled" ? (
            <>
              <TitleData titleData={defferedTitle} />
              {/* player and player header */}
              <Player playerLink={defferedTitle.link} />
              {/* comments wraper, here post comments and comments */}
              <CommentsWraper />
            </>
          ) : (
            <SkeletonTitlePage />
          )}
        </Suspense>
      </div>
    </>
  );
}

export default TitlePage;
