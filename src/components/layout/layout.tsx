import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import MobileMenu from "../header/mobile-meu/mobileMenu";

// by default its displaying header and footer
function Layout() {
  return (
    <div className="okami">
      <Header />
      <MobileMenu />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
