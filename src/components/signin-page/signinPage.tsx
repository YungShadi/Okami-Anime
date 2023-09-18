/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useAuth } from "../../hooks/useAuth";
import { logoutAction } from "../../redux/aunthSlice";
import { UserDto } from "../../types/userDto";
import {
  useLogoutMutation,
  useLazyCurrentUserQuery,
} from "../../redux/service/user/user.api";

function SigniinPage() {
  // const [login] = useLoginUserMutation();
  const [logout, { isSuccess }] = useLogoutMutation();
  const [currentUser] = useLazyCurrentUserQuery();
  const { register, handleSubmit } = useForm();
  const [acessToken, setAcessToken] = useState("");
  const dispatch = useDispatch();
  const { login } = useAuth();

  const onSubmit: SubmitHandler<UserDto> = (data) => {
    // login(data)
    //   .then((result) => {
    //     console.log(isSuccess);
    //     Cookies.set("access_jwt_token", `${result.data.access_jwt_token}`, {
    //       expires: 31,
    //       secure: true,
    //       sameSite: "None",
    //     });
    //     setAcessToken(result.data.access_jwt_token);
    //     Cookies.set("refresh_jwt_token", `${result.data.refresh_jwt_token}`, {
    //       expires: 31,
    //       secure: true,
    //       sameSite: "None",
    //     });
    //   })
    //   .then(() => {
    //     currentUser();
    //   })
    //   .catch((error) => {
    //     throw new Error(error);
    //   });
    login(data);
  };

  return (
    <div className="signup">
      <form className="signup-form form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Войдите в аккаунт</h2>
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
