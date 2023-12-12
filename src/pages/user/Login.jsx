import React, { useState } from "react";
import "./Login.css";
// 리액트 아이콘
import { LuBookOpen } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
// 리액트 라우터
import { Link, useNavigate } from "react-router-dom";
// firebase
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, githubAuth, googleAuth } from "../../firebase";
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

  //구글 인증
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth); //팝업창 생성
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // //깃허브 인증
  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubAuth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formContainer">
      <div className="logo">
        <LuBookOpen />
        Book
        <span className="nav_market">Store</span>
      </div>

      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="email"
          value={email}
          type="email"
          placeholder="이메일"
        />
        <input
          onChange={onChange}
          value={password}
          name="password"
          type="password"
          placeholder="비밀번호"
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
      <div className="loginIcon">
        <div className="snsLogin" onClick={signInWithGoogle}>
          <FcGoogle />
        </div>
        <div className="snsLogin" onClick={signInWithGithub}>
          <FaGithub />
        </div>
      </div>
      <p>
        계정이 없으신가요?
        <Link to="/user/join" style={{ textDecoration: "none" }}>
          <span style={{ color: "#527853", fontWeight: "bold" }}>가입하기</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
