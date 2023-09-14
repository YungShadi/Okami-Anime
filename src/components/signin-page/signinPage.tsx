/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../redux/loginSlice";
import { UserDto } from "../../types/userDto";
import {
  useLoginUserMutation,
  useLogoutMutation,
} from "../../redux/service/user/user.api";

function SigniinPage() {
  const [login] = useLoginUserMutation();
  const [logout] = useLogoutMutation();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const username = useSelector((state) => state?.login.username);

  const onSubmit: SubmitHandler<UserDto> = (data) => {
    login(data);
    dispatch(loginAction(data));
    console.log(username);
  };

  return (
    <div className="signup">
      <form className="signup-form form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Войдите в аккаунт </h2>
        <input
          type="username"
          placeholder="text"
          {...register("username")}
          className="form-input login-input"
        />
        <input
          type="password"
          placeholder="text"
          {...register("password")}
          className="form-input login-input"
        />
        <button type="submit" className="from-submit">
          Войти
        </button>
      </form>
      <button
        className="from-submit"
        type="button"
        onClick={() => {
          logout([]);
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default SigniinPage;
