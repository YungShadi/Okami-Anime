import React from "react";
import { createPortal } from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
// import { CapthcaDto } from "../../types/captchaDto";
import {
  isCaptchaDoneAction,
  toggleCaptchaAction,
} from "../../redux/capthcaSlice";

function Capthca() {
  const dispatch = useDispatch();
  // const showCaptcha = useSelector(
  //   (state: { captcha: CapthcaDto }) => state.captcha.showCaptcha
  // );
  // const isCaptchaDone = useSelector(
  //   (state: { captcha: CapthcaDto }) => state.captcha.isCaptchaDone
  // );

  return createPortal(
    <>
      <div className="captcha-window">
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={() => {
            dispatch(isCaptchaDoneAction(true));
            dispatch(toggleCaptchaAction(false));
          }}
        />
      </div>
      <div className="background" />
    </>,
    document.body
  );
}
export default Capthca;
