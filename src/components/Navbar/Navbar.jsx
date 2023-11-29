import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav_header">
        <a href="">
          Book<span className="nav_market">Store</span>
        </a>
      </div>
      <div className="nav_list">
        <ul>
          <li>
            <a href="">로그인</a>
          </li>
          <li>
            <a href="">로그인</a>
          </li>
          <li>
            <a href="">로그인</a>
          </li>
          <li>
            <a href="">로그인</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
