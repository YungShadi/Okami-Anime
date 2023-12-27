import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { FeedbackDto } from "../../types/feedbackDto";
import { MobileDto } from "../../types/mobileDto";
import Header from "../header";
import Feedback from "../feedbeackPage/Feedback";
import FeedbackButton from "../feedbeackPage/FeedbackButton";
import Loading from "./Loading";
import Footer from "../footer";

const MobileMenu = lazy(() => import("../mobile-meu/mobileMenu"));
// by default its displaying header and footer
function Layout() {
  const mobielView = useSelector(
    (state: { mobile: MobileDto }) => state?.mobile.isMobileView,
  );

  const feedbackState = useSelector(
    (state: { feedback: FeedbackDto }) => state.feedback.isFeedbackOpen,
  );

  return (
    <>
      <Header />
      <div className="okami" id="okami">
        {!mobielView && <FeedbackButton />}
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
        {mobielView && (
          <Suspense>
            <MobileMenu />
          </Suspense>
        )}
        <Suspense>{feedbackState && !mobielView && <Feedback />}</Suspense>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
