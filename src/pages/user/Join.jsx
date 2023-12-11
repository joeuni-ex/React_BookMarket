import React, { useState } from "react";
import { LuBookOpen } from "react-icons/lu";
import "./Login.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { errorMessageToKorean } from "./auth-components";

const Join = () => {
  const [isLoading, setLoading] = useState(false); //로딩
  const [name, setName] = useState(""); //이름
  const [email, setEmail] = useState(""); //이메일
  const [password, setPassword] = useState(""); //비밀번호
  const [error, setError] = useState(""); //에러 발생 시
  const navigate = useNavigate(); //네비게이션

  //회원가입 시 입력하는 유저 정보 저장
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // 회원가입 버튼 클릭 시
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); //에러 초기화
    if (isLoading || name === "" || email === "" || password === "") return;

    //회원가입 실행
    try {
      setLoading(true); //로딩시작
      //유저정보
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user); //유저 정보 출력
      await updateProfile(credentials.user, {
        displayName: name, //이름저장
      });
      navigate("/"); //회원가입 후 기본페이지로 이동
    } catch (e) {
      if (e instanceof FirebaseError) setError(e.code);
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
      <h1>회원가입</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} name="name" type="text" placeholder="이름" />
        <input
          onChange={onChange}
          name="email"
          type="email"
          placeholder="이메일"
        />
        <input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="비밀번호"
        />

        {/* 회원가입 로딩 표시 */}
        {isLoading && (
          <input className="loginBtn" type="submit" value="가입중" />
        )}

        {!isLoading && (
          <input className="loginBtn" type="submit" value="회원가입" />
        )}

        {error && (
          <span style={{ color: "red", textAlign: "center", marginTop: "5%" }}>
            {errorMessageToKorean(error)}
          </span>
        )}

        <p>
          이미 계정이 있습니까? <Link to="/user/login"> 로그인 </Link>
        </p>
      </form>
    </div>
  );
};

export default Join;
