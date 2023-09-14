/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterUserMutation } from "../../redux/service/user/user.api";
import "./signupPage.css";

function SignupPage() {
  const [regUser] = useRegisterUserMutation();
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler = (data) => regUser(data);

  return (
    <div className="signup">
      <form className="signup-form form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Зарегесртируйтесь</h2>
        <input type="username" placeholder="text" {...register("username")} />
        <input type="email" placeholder="text" {...register("email")} />
        <input type="password" placeholder="text" {...register("password")} />

        <button type="submit" className="from-submit">
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
