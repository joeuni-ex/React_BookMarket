import React from "react";
import "./Login.css";
import { LuBookOpen } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="logo">
        <LuBookOpen />
        Book
        <span className="nav_market">Store</span>
      </div>
      <h1>로그인</h1>
      <form>
        <input type="email" placeholder="이메일을 입력하세요..." />
        <input type="password" placeholder="비밀번호를 입력하세요..." />
        <input className="loginBtn" type="submit" value="로그인" />
      </form>
      <div className="googleLogin">
        <FcGoogle />
      </div>
    </div>
  );
};

export default Login;
