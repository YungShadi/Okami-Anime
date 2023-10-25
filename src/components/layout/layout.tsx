import React, { Suspense } from "react";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import Loading from "./Loading";
import MobileMenu from "../header/mobile-meu/mobileMenu";

// by default its displaying header and footer
// ! Loading component
function Layout() {
  return (
    <div className="okami">
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      {createPortal(<MobileMenu />, document.body)}
    </div>
  );
}

export default Layout;
