import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserDto } from "../../types/userDto";
// import { useAuth } from "../../hooks/useAuth";
import DeafaultPic from "../img/Аватар.png";
import DefaultBack from "../img/wp5325503-1045900026.png";
import Settings from "../img/settings.svg";

import "./profile-page.scss";

function ProfilePage() {
  const username =
    useSelector((state: { auth: UserDto }) => state?.auth.username) || "loh";

  const location = useLocation();

  const navigate = useNavigate();
  // const { logout } = useAuth();

  // const role = useSelector(
  //   (state: { auth: UserDto }) => state?.auth.authorities,
  // );

  useEffect(() => {
    if (location.pathname === "/profile" || location.pathname === "/profile/") {
      navigate(`/profile/${username}`);
    }
  });

  useEffect(() => {
    document.title = `${username}`;
  }, []);

  return (
    <div className="profile">
      <div className="profile-head">
        <img
          src={DefaultBack}
          alt="background"
          className="profile-head-background"
        />
        <div className="prof-pic-wrap">
          <img src={DeafaultPic} alt="profile pic" className="profile-pic" />
          <button type="button" className="profile-settings">
            <img src={Settings} alt="settings" />
          </button>
        </div>
      </div>
      <div className="profile-main">
        <div className="profile-user-info">
          <h2 className="info-name">{username}</h2>
          <span className="info-date">На сайте с 2022</span>
        </div>
        <div className="profile-user-stats">
          <h3>Статистика:</h3>
          <div>Средняя оценка: 3.2</div>
          <div className="stats-watched">Проосмотренно 120 тайтлов</div>
          <div>Просмотренно за этот месяц 10</div>
        </div>
        <div className="profile-hisotry">
          <h3>История:</h3>
          <div className="history">Какие-то тайтлы</div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
