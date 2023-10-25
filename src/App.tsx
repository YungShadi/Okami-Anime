import React, { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import ErrorPage from "./components/ErrorPage";
import Layout from "./components/layout/layout";
// import MainPage from "./components/main-page/main-page";
// import CataloguePage from "./components/catalogue-page";
// import TitlePage from "./components/title-page/title-page";
// import Copyright from './components/copyright/copyright';
// import SignupPage from "./components/signup-page";
// import ProfilePage from "./components/profile-page";
// import ProfileMain from "./components/profile-page/profile-main";
// import ProfileList from "./components/profile-page/profile-list";
// import SigniinPage from "./components/signin-page/signinPage";
// import AboutUs from "./components/aboutus-page";
// import PersonalAgreementPage from "./components/PersonalAgreementPage";
import { MobileDto } from "./types/mobileDto";
import { isMobileViewAction } from "./redux/mobileSlcie";

const MainPage = lazy(() => import("./components/main-page/main-page"));
const TitlePage = lazy(() => import("./components/title-page/title-page"));
const CataloguePage = lazy(() => import("./components/catalogue-page"));
const Copyright = lazy(() => import("./components/copyright/copyright"));
const SignupPage = lazy(() => import("./components/signup-page"));
const SigniinPage = lazy(() => import("./components/signin-page/signinPage"));
const ProfilePage = lazy(() => import("./components/profile-page"));
const ProfileMain = lazy(
  () => import("./components/profile-page/profile-main")
);
const ProfileList = lazy(
  () => import("./components/profile-page/profile-list")
);
const AboutUs = lazy(() => import("./components/aboutus-page"));
const PersonalAgreementPage = lazy(
  () => import("./components/PersonalAgreementPage")
);

function App() {
  const dispatch = useDispatch();
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMenuOpened
  );
  useEffect(() => {
    if (menuState) {
      document.body.style.overflow = "hidden";
      // document.body.style.opacity = "0.8";
    } else {
      document.body.style.overflow = "";
      // document.body.style.opacity = "";
    }
  }, [menuState]);

  if (window.screen.width <= 600) {
    dispatch(isMobileViewAction(true));
  }

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
        <Route path="personal-agreement" element={<PersonalAgreementPage />} />
        <Route path="profile/*" element={<ProfilePage />}>
          <Route path=":username" element={<ProfileMain />} />
          <Route path="list" element={<ProfileList />} />
          <Route path="settings" element={<p>settings</p>} />
        </Route>
        <Route path="about-us" element={<AboutUs />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
