import React, { Suspense, lazy } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import Loading from "./Loading";
import { MobileDto } from "../../types/mobileDto";
import { ErrorDto } from "../../types/errorDto";
import ErrorPopout from "../error/ErrorPopout";
import Feedback from "../feedbeack-page/Feedback";
import FeedbackButton from "../feedbeack-page/FeedbackButton";
// import MobileMenu from "../header/mobile-meu/mobileMenu";
import { FeedbackDto } from "../../types/feedbackDto";

const MobileMenu = lazy(() => import("../header/mobile-meu/mobileMenu"));
// by default its displaying header and footer
// ! Loading component
function Layout() {
  const mobielView = useSelector(
    (state: { mobile: MobileDto }) => state?.mobile.isMobileView
  );
  const errorArray = useSelector(
    (state: { error: ErrorDto }) => state.error.errorObj
  );
  const feedbackState = useSelector(
    (state: { feedback: FeedbackDto }) => state.feedback.isFeedbackOpen
  );
  return (
    <>
      <Header />
      <div className="okami">
        <FeedbackButton />
        <main style={{ minHeight: "70vh" }}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>

        {mobielView && (
          <Suspense>{createPortal(<MobileMenu />, document.body)}</Suspense>
        )}
        {errorArray.map((error) => (
          <ErrorPopout
            errorM={error.errorMessage}
            errorCode={error.statusCode}
            key={error.index}
            index={error.index}
          />
        ))}
        <Suspense>{feedbackState && <Feedback />}</Suspense>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
