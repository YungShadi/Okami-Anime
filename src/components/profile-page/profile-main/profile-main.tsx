import React from "react";
import DeafaultPic from "../../img/Аватар.png";

function ProfileMain() {
  return (
    <div className="profile-main">
      <img src={DeafaultPic} alt="profile" className="profile-picture" />
      <div className="profile-info">
        <span>AnalaDestroyer</span>
        <span>На сайте с 14.08.2008</span>
        <span>Роль: Еблан</span>
      </div>
    </div>
  );
}

export default ProfileMain;
