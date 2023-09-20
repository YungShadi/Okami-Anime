/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logoutAction } from "../../redux/aunthSlice";
import { UserDto } from "../../types/userDto";
import { useLogoutMutation } from "../../redux/service/user/user.api";

function SigniinPage() {
  // const [login] = useLoginUserMutation();
  const { isAuthenticated } = useAuth();
  const [logout] = useLogoutMutation();
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
      </form>
      <button
        className="from-submit"
        type="button"
        onClick={() => {
          logout([]);
          dispatch(logoutAction());
          Cookies.remove("refresh_token");
          Cookies.remove("acess_token");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default SigniinPage;
