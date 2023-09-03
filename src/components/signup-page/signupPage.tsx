import React from "react";

import "./signupPage.css";

function SignupPage() {
  return (
    <div className="signup">
      <form className="signup-form form">
        <h2>Зарегесрируйтесь</h2>
        <input type="password" placeholder="text" />
      </form>
    </div>
  );
}

export default SignupPage;
