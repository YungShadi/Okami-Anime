import React from "react";
import { useNavigate } from "react-router-dom";
import StopRigthThereImg from "../img/stoprigththere.png";

function ErrorPage() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <div
      className="errorpage"
      style={{
        height: "30vh",
        width: "80vw",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "1000px",
      }}
    >
      <button onClick={goBack} type="button">
        Назад
      </button>
      <h2>Такой страницы не существует D:</h2>
      <img
        src={StopRigthThereImg}
        alt="stop rigth there"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default ErrorPage;
