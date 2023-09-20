import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../../hooks/useAuth";
import { UserDto } from "../../../types/userDto";
import DeafaultPic from "../../img/Аватар.png";

function ProfileMain() {
  const { logout } = useAuth();
  const username = useSelector(
    (state: { auth: UserDto }) => state?.auth.username
  );
  const role = useSelector(
    (state: { auth: UserDto }) => state?.auth.authorities
  );

  return (
    <div className="profile-main">
      <img src={DeafaultPic} alt="profile" className="profile-picture" />
      <div className="profile-info">
        <p>{username}</p>
        <span>На сайте с 14.08.2008</span>
        <span>Роль: {role}</span>
        <button
          className="from-submit"
          type="button"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileMain;
