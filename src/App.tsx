import React, { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "./components/error/ErrorPage";
import Layout from "./components/layout/layout";
import { MobileDto } from "./types/mobileDto";
import { isMobileViewAction } from "./redux/mobileSlcie";

import "./App.css";

const MainPage = lazy(() => import("./components/main-page/main-page"));
const TitlePage = lazy(() => import("./components/title-page/title-page"));
const CataloguePage = lazy(() => import("./components/catalogue-page"));
const Copyright = lazy(() => import("./components/copyright/copyright"));
const SignupPage = lazy(() => import("./components/signup-page"));
const SigniinPage = lazy(() => import("./components/signin-page/signinPage"));
const ProfilePage = lazy(() => import("./components/profile-page"));

const AboutUs = lazy(() => import("./components/aboutus-page"));
const PersonalAgreementPage = lazy(
  () => import("./components/PersonalAgreementPage"),
);

function App() {
  const dispatch = useDispatch();
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMenuOpened,
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

  useEffect(() => {
    if (window.screen.width <= 600) {
      dispatch(isMobileViewAction(true));
    } else {
      dispatch(isMobileViewAction(false));
    }
    window.addEventListener("resize", () => {
      if (window.screen.width <= 600) {
        dispatch(isMobileViewAction(true));
      } else {
        dispatch(isMobileViewAction(false));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // TODO popout errors
  // TODO Feedback animation and lazy load
  // TODO mobile menu

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
        <Route path="profile/*" element={<ProfilePage />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
