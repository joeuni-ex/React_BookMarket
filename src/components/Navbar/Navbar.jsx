import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { LuBookOpen } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser; //현재 접속 유저
  const [loggedIn, setLoggedIn] = useState(!!auth.currentUser);

  useEffect(() => {
    // !!user 존재여부확인 방법
    // 유저의 인증 상태의 변경 사항을 모니터링하고, 변경되면
    // 매개변수와 함께 제공된 콜백이 트리거된다.
    // 그런 다음 상태 업데이트함
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  //console.log(user);
  //로그아웃 함수
  const logOut = () => {
    auth.signOut().then(() => {
      setLoggedIn(false);
      navigate("/user/login");
    });
  };

  // console.log(user);
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
            {/* 로그인 여부에 따라 메뉴 상이 */}
            {user ? (
              <>
                <li>{user.displayName}님 환영합니다!</li>
                <li>
                  <Link to="/user/cart">장바구니</Link>
                </li>
                <li>
                  <Link to="/user/mypage">마이페이지</Link>
                </li>
                <li onClick={logOut}>로그아웃</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/user/join">회원가입</Link>
                </li>
                <li>
                  <Link to="/user/login">로그인</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
