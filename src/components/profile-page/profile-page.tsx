import React, { useEffect } from "react";
import "./profile-page.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserDto } from "../../types/userDto";
// import { useAuth } from "../../hooks/useAuth";
import DeafaultPic from "../img/Аватар.png";

function ProfilePage() {
  const username =
    useSelector((state: { auth: UserDto }) => state?.auth.username) || "loh";

  const location = useLocation();

  const navigate = useNavigate();
  // const { logout } = useAuth();

  const role = useSelector(
    (state: { auth: UserDto }) => state?.auth.authorities,
  );

  useEffect(() => {
    if (location.pathname === "/profile" || location.pathname === "/profile/") {
      navigate(`/profile/${username}`);
    }
  });

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="profile-background" />
        <img src={DeafaultPic} alt="profile" className="profile-picture" />
        <p>{username}</p>
        <button type="button">Редактировать профиль</button>
        <span>На сайте с 14.08.2008</span>
        <span>Роль: {role}</span>
        <div className="horisontal-devider" />
        <div className="profile-stats">
          <div className="profile-list">
            <span>Списки:</span>
            Просмотренные, понравились и тп
          </div>
          <div className="profile-history">
            Последние просмотренные:
            <div className="title">some titile</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
