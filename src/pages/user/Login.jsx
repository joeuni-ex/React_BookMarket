import React, { useState } from "react";
import "./Login.css";
import { LuBookOpen } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { errorMessageToKorean } from "./auth-components";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    //이벤트 객체를 분리함 ( target -> name/value )
    //console.log(e);
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); //에러 초기화
    if (isLoading || email === "" || password === "") return; //만약 이름,이메일,패스워드가 공백이면 리턴함

    //로그인 실행
    try {
      setLoading(true); //로딩 시작
      //유저정보
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user); // 유저 정보 출력
      navigate("/"); //로그인 완료 후 기본 페이지로
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.code);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="logo">
        <LuBookOpen />
        Book
        <span className="nav_market">Store</span>
      </div>
      <h1>로그인</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="email"
          value={email}
          type="email"
          placeholder="이메일을 입력하세요..."
        />
        <input
          onChange={onChange}
          value={password}
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요..."
        />
        <input
          className="loginBtn"
          type="submit"
          value={isLoading ? "로딩중" : "로그인"}
        />
      </form>
      {error && (
        <span style={{ color: "red", textAlign: "center", marginTop: "5%" }}>
          {errorMessageToKorean(error)}
        </span>
      )}
      <div className="googleLogin">
        <FcGoogle />
      </div>
      <p>
        계정이 없으신가요? <Link to="/user/join"> 가입하기 </Link>
      </p>
    </div>
  );
};

export default Login;
