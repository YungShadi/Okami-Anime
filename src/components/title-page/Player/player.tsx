import React from "react";

function PlayerComponent({ playerLink }: { playerLink: string }) {
  return (
    <div className="player-wraper">
      <div className="title-header">
        {/* player header */}
        <span className="header-tab just-player">Плеер</span>
      </div>
      <div className="player">
        {/* iframe includes player link */}
        {playerLink ? (
          <iframe
            title="player"
            src={`${playerLink}`}
            allow="autoplay *; fullscreen *"
            key="player"
            className="player"
          />
        ) : (
          <p>Видео не найдено</p>
        )}
      </div>
    </div>
  );
}
// eslint-disable-next-line import/prefer-default-export
export const Player = React.memo(PlayerComponent);
