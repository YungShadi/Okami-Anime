import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <div className="errorpage" style={{ height: "695px" }}>
      <button onClick={goBack} type="button">
        Назад
      </button>
      <h2>Такой страницы не существует D:</h2>
    </div>
  );
}

export default ErrorPage;
