import React from "react";
import { useLogoutMutation } from "../../../redux/service/user/user.api";
import DeafaultPic from "../../img/Аватар.png";

function ProfileMain() {
  const [logout] = useLogoutMutation();

  return (
    <div className="profile-main">
      <img src={DeafaultPic} alt="profile" className="profile-picture" />
      <div className="profile-info">
        <span>AnalaDestroyer</span>
        <span>На сайте с 14.08.2008</span>
        <span>Роль: Еблан</span>
        <button
          className="from-submit"
          type="button"
          onClick={() => {
            logout([]);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileMain;
