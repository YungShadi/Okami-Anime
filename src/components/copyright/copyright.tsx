import React from "react";

// copyright information
// didnt find the way to properly display footer on bottom
function Copyright() {
  return (
    <div
      className="nda-info"
      style={{
        width: "1200px",
        height: "700px",
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
      <ul
        style={{ marginLeft: "40px", fontSize: "20px", marginBottom: "30px" }}
      >
        <li>Ссылку на материал, нарущающий авторское право</li>
        <li>Реквизиты компании, контакные данные</li>
        <li>Документы, подтверждающие право на владение материалом</li>
      </ul>
      {/* english copirigth info */}
      <span style={{ display: "block", fontSize: "20px" }}>
        Dear rightsholders, this site is a non-profit project. All information
        presented on the site is taken from open sources.
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
        However, if any content violates <b>copyrights</b>, please contact us at{" "}
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
        Please attach to the message:
      </span>
      <ul
        style={{ marginLeft: "40px", fontSize: "20px", marginBottom: "30px" }}
      >
        <li>Link to the material that violates copyright</li>
        <li>Company details, contact information</li>
        <li>Documents confirming the right to own the material</li>
      </ul>
      {/* idk why but here is an japanese translation */}
      <span style={{ display: "block", fontSize: "20px" }}>
        尊敬なる権利所有者様、このサイトは非営利プロジェクトです。
        サイトに掲載されている情報はすべてオープンソースから取得されています。
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
        ただし、何かしらのコンテンツが著作権を侵害している場合は、
        メールでお問い合わせいただければ幸いです。
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
        メッセージに添付してください：
      </span>
      <ul style={{ marginLeft: "40px", fontSize: "20px" }}>
        <li>著作権を侵害する素材へのリンク</li>
        <li>会社の詳細情報、連絡先</li>
        <li>素材の所有権を確認する文書</li>
      </ul>
    </div>
  );
}

export default Copyright;
