import React from "react";
import { Routes, Route } from "react-router-dom";

import "./app.css";
import MainPage from "./components/main-page/main-page";
import TitlePage from "./components/title-page/title-page";
import Layout from "./components/layout/layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="title" element={<TitlePage />} />
      </Route>
    </Routes>
  );
}

export default App;
