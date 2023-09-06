import React, { useState } from "react";
import "./profile-page.css";

function ProfilePage() {
  const [active, setActive] = useState(false);
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="header-tabs">
          <a
            className={`tab-profile ${active ? "active" : ""} `}
            onClick={() => {
              setActive(!active);
            }}
          >
            Профиль
          </a>
          <a className="tab-profile">Списки</a>
        </div>
      </div>
      <div className="profile-main"></div>
    </div>
  );
}

export default ProfilePage;
