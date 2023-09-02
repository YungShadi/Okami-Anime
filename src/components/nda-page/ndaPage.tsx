import React from "react";

function NdaPage() {
  return (
    <div
      className="nda-info"
      style={{
        width: "1200px",
        height: "max-content",
        background: "rgba(6, 75, 140, 0.8)",
        padding: "10px",
      }}
    >
      <span style={{ display: "block", fontSize: "20px" }}>
        Уважаемые правообладатели, данный сайт являеться некоммерчесим проектом.
        Вся информация, предстваленная на сайте, взята из открытых источников.
      </span>
      <span
        style={{
          display: "block",
          opacity: "0",
          width: " 100%",
          height: "10px",
        }}
      />
      <span style={{ display: "block", fontSize: "20px" }}>
        Если, все же, какой-то контент нарушает <b>авторские права</b>,
        обращайтесь на почту{" "}
        <a
          href="mailto:kakashki@anime.ru"
          type="mail"
          style={{ color: "red", textDecoration: "none" }}
        >
          kakashki@anime.ru
        </a>
      </span>
      <span
        style={{
          display: "block",
          opacity: "0",
          width: " 100%",
          height: "10px",
        }}
      />
      <span style={{ display: "block", fontSize: "20px" }}>
        К сообщению приложите:
      </span>
      <ul style={{ marginLeft: "40px", fontSize: "20px" }}>
        <li>Ссылку на материал, нарущающий авторское право</li>
        <li>Реквизиты компании, контакные данные</li>
        <li>Документы, подтверждающие право на владение материалом</li>
      </ul>
    </div>
  );
}

export default NdaPage;
