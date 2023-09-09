/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useLoginUserMutation } from "../../redux/service/okamiApi";

function SigniinPage() {
  const [login] = useLoginUserMutation();
  const { register, handleSubmit } = useForm();
  const [cookies, setCookie] = useCookies();
  const onSubmit: SubmitHandler = (data) => {
    login(data).then((result) => console.log(result));
    setCookie("loh", 23);
  };

  return (
    <div className="signup">
      <form className="signup-form form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Зарегесрируйтесь</h2>
        <input type="username" placeholder="text" {...register("username")} />
        <input type="password" placeholder="text" {...register("password")} />

        <button type="submit">Зарагестрироваться</button>
      </form>
    </div>
  );
}

export default SigniinPage;
