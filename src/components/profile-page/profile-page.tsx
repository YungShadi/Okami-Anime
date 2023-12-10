import React, { useEffect } from "react";
import "./profile-page.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserDto } from "../../types/userDto";
// import { useAuth } from "../../hooks/useAuth";
import DeafaultPic from "../img/Аватар.png";
import DefaultBack from "../img/wp5325503-1045900026.png";

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
        </div>
      </div>
      <div className="profile-info">
        <span className="prfoile-displayed-name">Loh</span>
        <span className="profile-name">loh123</span>
        <span className="profile-desc">Я лох, так бывает, кто-то лох.</span>
      </div>
    </div>
  );
}

export default ProfilePage;
