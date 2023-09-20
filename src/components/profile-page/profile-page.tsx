import React, { useState } from "react";
import "./profile-page.css";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserDto } from "../../types/userDto";

function ProfilePage() {
  const username = useSelector(
    (state: { auth: UserDto }) => state?.auth.username
  );
  const [active, setActive] = useState(false);
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="header-tabs">
          <NavLink
            to={`/${username}/profile`}
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
