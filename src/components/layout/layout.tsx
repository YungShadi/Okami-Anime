import React, { Suspense, lazy } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import Loading from "./Loading";
import { MobileDto } from "../../types/mobileDto";
// import MobileMenu from "../header/mobile-meu/mobileMenu";

const MobileMenu = lazy(() => import("../header/mobile-meu/mobileMenu"));
// by default its displaying header and footer
// ! Loading component
function Layout() {
  const mobielView = useSelector(
    (state: { mobile: MobileDto }) => state?.mobile.isMobileView
  );
  return (
    <div className="okami">
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      {mobielView && (
        <Suspense>{createPortal(<MobileMenu />, document.body)}</Suspense>
      )}
    </div>
  );
}

export default Layout;
