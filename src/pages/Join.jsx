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
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="이메일을 입력하세요..." />
        <input type="password" placeholder="비밀번호를 입력하세요..." />
        <input className="loginBtn" type="submit" value="로그인" />
      </form>
    </div>
  );
};

export default Join;
