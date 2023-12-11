import React, { useState } from "react";

export default function Spoiler({ spoilerText }: { spoilerText: string }) {
  const [isVisible, setIsVisible] = useState(false);
  return isVisible ? (
    <p className="spoiler visible">{spoilerText}</p>
  ) : (
    <button
      type="button"
      className="spoiler"
      onClick={() => setIsVisible(true)}
    >
      Спойлер
    </button>
  );
}
