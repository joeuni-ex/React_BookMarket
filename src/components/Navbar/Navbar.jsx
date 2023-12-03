import React from "react";
import "./Navbar.css";
import { LuBookOpen } from "react-icons/lu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
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
          <li>
            <Link to="/join">회원가입</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
