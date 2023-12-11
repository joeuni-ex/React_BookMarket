import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { LuBookOpen } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser; //현재 접속 유저
  //console.log(user);
  //로그아웃 함수
  const logOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav_header">
          <Link to="/">
            <LuBookOpen />
            Book
            <span className="nav_market">Store</span>
          </Link>
        </div>
        <div className="nav_list">
          <ul>
            {/* 현재 로그인 중인 유저가 아니면 */}
            {!user && (
              <>
                <li>
                  <Link to="/user/join">회원가입</Link>
                </li>
                <li>
                  <Link to="/user/login">로그인</Link>
                </li>
              </>
            )}
            {/* 현재 로그인중이면*/}
            {user && (
              <>
                <li>{user.displayName}님 환영합니다!</li>
                <li onClick={logOut}>로그아웃</li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
