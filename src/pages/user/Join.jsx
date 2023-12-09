import React from "react";
import { LuBookOpen } from "react-icons/lu";
import "./Login.css";

const Join = () => {
  return (
    <div className="formContainer">
      <div className="logo">
        <LuBookOpen />
        Book
        <span className="nav_market">Store</span>
      </div>
      <h1>회원가입</h1>
      <form>
        <input type="text" placeholder="이름" />
        <input type="email" placeholder="이메일" />
        <input type="password" placeholder="비밀번호" />
        <input className="loginBtn" type="submit" value="회원가입" />
      </form>
    </div>
  );
};

export default Join;
