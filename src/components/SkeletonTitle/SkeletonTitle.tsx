import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonTitle() {
  if (window.innerWidth < 1100) {
    return (
      <SkeletonTheme baseColor="#05315A" highlightColor="#0C4281 ">
        <div className="title-main skeleton-title" style={{ width: "260px" }}>
          <div className="title-poster-wraper">
            <div className="title-poster poster">
              <Skeleton height="100%" className="title-poster poster" />
            </div>
          </div>
          <div className="title-name-tags">
            <span className="title-name name" style={{ marginBottom: "10px" }}>
              <Skeleton width={135} height={40} />
            </span>
            <span className="title-episodes">
              <Skeleton width={120} />
            </span>
            <div className="title-tags tags">
              <Skeleton width={120} />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }
  return (
    <SkeletonTheme baseColor="#05315A" highlightColor="#0C4281">
      <div className="catalogue-page-title title-main skeleton-title">
        <div className="title-poster-wraper">
          <div className="title-poster poster">
            <Skeleton width={200} height={290} />
          </div>
        </div>
        <div className="title-name-tags">
          <span className="title-name name">
            <Skeleton width={190} height={30} />
          </span>
          <span className="title-episodes">
            <Skeleton width={100} />
          </span>
          <div className="title-tags tags">
            <Skeleton width={190} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
export default SkeletonTitle;
