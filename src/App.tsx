import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

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
