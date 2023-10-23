/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MobileDto } from "../../types/mobileDto";
import { toggleMenuAction } from "../../redux/mobileSlcie";
import { useAuth } from "../../hooks/useAuth";
import { UserDto } from "../../types/userDto";

function SigniinPage() {
  const menuState = useSelector(
    (state: { mobile: MobileDto }) => state.mobile.isMenuOpened
  );
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const onSubmit: SubmitHandler<UserDto> = (data) => {
    login(data);
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
  return (
    <div className="signup">
      <form className="signup-form form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Войдите в аккаунт</h2>
        <div className="input-wrapper">
          <h3 className="form-input-title">Имя пользователя</h3>
          <input
            type="username"
            placeholder="Имя пользовтаеля"
            {...register("username", { required: true, minLength: 0 })}
            className="form-input login-input"
          />
          {errors.username?.type === "required" && (
            <p className="error-message-input">Имя пользователя обязательно</p>
          )}
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
        <button type="submit" className="from-submit">
          Войти
        </button>
        <span style={{marginTop: "20px"}}>
          Вы еще не зарегстрированны?{" "}
          <Link to="/sign-up" style={{ color: "white" }}>
            {" "}
            Регестрация{" "}
          </Link>
        </span>
      </form>
    </div>
  );
}

export default SigniinPage;
