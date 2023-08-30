import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

function Layout() {
  return (
    <div className="okami">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
