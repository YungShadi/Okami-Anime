/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { logoutAction } from "../../redux/aunthSlice";
import { UserDto } from "../../types/userDto";
import {
  useLoginUserMutation,
  useLogoutMutation,
  useCurrentUserQuery,
} from "../../redux/service/user/user.api";

function SigniinPage() {
  const [login] = useLoginUserMutation();
  const [logout] = useLogoutMutation();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { refetch: currendSend } = useCurrentUserQuery(["User"]);
  // const username = useSelector((state) => state?.login.username);

  const onSubmit: SubmitHandler<UserDto> = (data) => {
    login(data).then((result) => {
      Cookies.set("acess_token", `${result.data.access_jwt_token}`, {
        expires: 31,
        secure: true,
        sameSite: "None",
      });
      Cookies.set("refresh_token", `${result.data.refresh_jwt_token}`, {
        expires: 31,
        secure: true,
        sameSite: "None",
      });
      currendSend();
    });
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
