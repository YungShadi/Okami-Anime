/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuAction } from "../../redux/mobileSlcie";
import { MobileDto } from "../../types/mobileDto";
import { useAuth } from "../../hooks/useAuth";
import { UserDto } from "../../types/userDto";
import "./signupPage.css";

function SignupPage() {
  const dispatch = useDispatch();
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMenuOpened
  );
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [cbError, setCbError] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, regestration } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<UserDto> = (data) => {
    if (checkboxStatus) {
      regestration(data);
      setCbError(false);
    } else {
      setCbError(true);
    }
  };

  if (isAuthenticated) {
    navigate("/");
  }

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if (menuState) {
        dispatch(toggleMenuAction(!menuState));
      }
    };
  });

  const LinkStyle = {
    color: "white",
  };

  return (
    <div className="signup">
      <form className="signup-form form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Зарегесртируйтесь</h2>
        <div className="input-wrapper">
          <h3 className="form-input-title">Имя пользователя</h3>
          <input
            type="username"
            placeholder="Имя пользовтаеля"
            {...register("username", {
              required: true,
              minLength: 3,
              pattern: /^[a-zA-Z0-9]{4,10}$/,
            })}
            className="form-input login-input"
          />
          {errors.username?.type === "required" && (
            <p className="error-message-input">Имя пользователя обязательно</p>
          )}
        </div>
        <div className="input-wrapper">
          <h3 className="form-input-title">Электронная почта</h3>
          <input
            className="form-input"
            type="email"
            placeholder="email"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />
        </div>
        <div className="input-wrapper">
          <h3 className="form-input-title">Пароль</h3>
          <input
            type="password"
            placeholder="Пароль"
            {...register("password", { required: true })}
            className="form-input login-input"
          />
          {errors.password?.type === "required" && (
            <p className="error-message-input">Пароль обязателен</p>
          )}
        </div>
        <label htmlFor="personalInfoCb">
          <input
            type="checkbox"
            className="personalInfoCb"
            id="personalInfoCb"
            checked={checkboxStatus}
            onClick={() => setCheckboxStatus(!checkboxStatus)}
          />
          Даю согласие на{" "}
          <Link to="/personal-agreement" style={LinkStyle}>
            обработку персональных данных
          </Link>
          {cbError && (
            <span style={{ display: "inline-block", color: "red" }}>
              Подвердите согласие на обработку данных
            </span>
          )}
        </label>
        <button type="submit" className="from-submit">
          Зарегестрироваться
        </button>
        <span style={{ marginTop: "20px" }}>
          У вас уже есть аккаунт?{" "}
          <Link to="/sign-in" style={LinkStyle}>
            {" "}
            Войдите{" "}
          </Link>
        </span>
      </form>
    </div>
  );
}

export default SignupPage;
