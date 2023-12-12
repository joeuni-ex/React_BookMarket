import React from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser; //현재 접속유저
  if (user === null) {
    //유저가 없으면 navigate로 login페이지로 이동
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/user/login" />;
  }
  return children; //자식컴포넌트로 이동
};

export default ProtectedRoute;
