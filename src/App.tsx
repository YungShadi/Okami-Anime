import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { useDispatch } from "react-redux";
import {
  useCurrentUserQuery,
  // useRefreshJWTMutation,
} from "./redux/service/user/user.api";
import { currentUserAction } from "./redux/aunthSlice";
// import { UserDto } from "./types/userDto";

import MainPage from "./components/main-page/main-page";
import TitlePage from "./components/title-page/title-page";
import Layout from "./components/layout/layout";
import CataloguePage from "./components/catalogue-page";
import Copyright from "./components/copyright/copyright";
import SignupPage from "./components/signup-page";
import ProfilePage from "./components/profile-page";
import ProfileMain from "./components/profile-page/profile-main";
import ProfileList from "./components/profile-page/profile-list";
import ErrorPage from "./components/ErrorPage";
import SigniinPage from "./components/signin-page/signinPage";

function App() {
  // const [refresh] = useRefreshJWTMutation();
  const { data: userData, isSuccess: currentSeccess } = useCurrentUserQuery([
    "User",
  ]);
  const dispathc = useDispatch();

  useEffect(() => {
    if (currentSeccess) {
      dispathc(currentUserAction({ ...userData, logined: true }));
    }
    // return () => {
    //   refresh([])
    //     .then((result): void => {
    //       Cookies.set("acess_token", `${result.data.access_jwt_token}`, {
    //         expires: 31,
    //         secure: true,
    //         sameSite: "None",
    //       });
    //       Cookies.set("refresh_token", `${result.data.refresh_jwt_token}`, {
    //         expires: 31,
    //         secure: true,
    //         sameSite: "None",
    //       });
    //     })
    //     .catch((error) => {
    //       throw new Error(error);
    //     });
    // };
  }, [currentSeccess]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="title" element={<TitlePage />} />
        <Route path="catalogue" element={<CataloguePage />} />
        <Route path="article/:random" element={<TitlePage />} />
        <Route path="article" element={<TitlePage />} />
        <Route path="copyright" element={<Copyright />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="sign-in" element={<SigniinPage />} />
        <Route path=":username/*" element={<ProfilePage />}>
          <Route path="profile" element={<ProfileMain />} />
          <Route path="list" element={<ProfileList />} />
          <Route path="settings" element={<p>settings</p>} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
