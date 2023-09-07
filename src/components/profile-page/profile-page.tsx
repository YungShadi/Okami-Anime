import React, { useState } from "react";
import "./profile-page.css";
import { NavLink, Outlet } from "react-router-dom";

function ProfilePage() {
  const [active, setActive] = useState(false);
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="header-tabs">
          <NavLink
            to="profile"
            className="tab-profile"
            onClick={() => {
              setActive(!active);
            }}
          >
            Профиль
          </NavLink>
          <NavLink to="list" className="tab-profile">
            Списки
          </NavLink>
          <NavLink to="settings" className="tab-profile">
            Настройки
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default ProfilePage;
