import React, { useState } from "react";
import "./profile-page.css";
import { NavLink, Route, Routes } from "react-router-dom";

function ProfilePage() {
  const [active, setActive] = useState(false);
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="header-tabs">
          <NavLink
            to="/profile"
            className={`tab-profile ${active ? "active" : ""} `}
            onClick={() => {
              setActive(!active);
            }}
          >
            Профиль
          </NavLink>
          <NavLink to="list" className="tab-profile">
            Списки
          </NavLink>
        </div>
      </div>
      <div className="profile-main"></div>
      <Routes>
        <Route path="list" element={<p>im in listaaaaaaaa</p>} />
      </Routes>
    </div>
  );
}

export default ProfilePage;
