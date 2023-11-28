import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function SkeletonTitlePage() {
  return (
    <SkeletonTheme baseColor="#05315A" highlightColor="#0C4281">
      <div className="title-info skeleton">
        <div className="poster-wraper">
          <Skeleton className="title-poster" width={300} />
          {/* title condition */}
          <div className="select-wrapper">
            <Skeleton className="select-trigger" />
          </div>
          {/* view order */}
          <div className="view-order-wraper">
            <Skeleton className="view-order-trigger" />
          </div>
        </div>
        {/* title info */}
        <div className="title-text-info">
          <span className="title-name">
            <Skeleton />
          </span>
          <div className="title-alt-names">
            <span className="title-alt-name">
              <Skeleton />
            </span>
          </div>
          <span className="title-genre">
            Жанры: <Skeleton />
          </span>
          <span className="title-year">
            Год:
            <Skeleton />
          </span>
          <span className="title-status">
            Статус:
            <Skeleton />
          </span>
          <span className="title-type">
            Тип: <Skeleton />
          </span>
          <span className="title-ep">
            Количество серий: <Skeleton />
          </span>
          <div className="title-dubs">
            Озвучки:
            <Skeleton />
          </div>
          <div>
            <span className="title-desc show">
              <Skeleton />
            </span>
          </div>
        </div>
      </div>
      <div className="player-wraper">
        <div className="title-header">
          {/* player header */}
          <span className="header-tab just-player">Плеер</span>
        </div>
        <div className="player">{/* iframe includes player link */}</div>
      </div>
    </SkeletonTheme>
  );
}
