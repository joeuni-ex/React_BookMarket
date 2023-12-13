import { useState } from "react";
import { auth } from "../../firebase";
import "./UserPage.css";

// 리액트 아이콘
import { IoBookmarks } from "react-icons/io5";
import InterestedBook from "./InterestedBook";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import Cart from "./Cart";

const UserPage = () => {
  const user = auth.currentUser;
  const [selectedMenu, setSelectedMenu] = useState("관심 도서");

  //메뉴 선택
  const handleChange = (value) => {
    setSelectedMenu(value);
  };

  return (
    <div className="userpageContainer">
      <div className="aside">
        <h3>마이페이지</h3>
        <br />
        <ul>
          <li onClick={() => handleChange("관심 도서")}>관심 도서</li>
          <li onClick={() => handleChange("장바구니")}>장바구니</li>
          <li onClick={() => handleChange("내 정보")}>내 정보</li>
        </ul>
      </div>
      <div className="mypage">
        <h2>
          {selectedMenu === "관심 도서" ? (
            <IoBookmarks style={{ color: " #527853" }} />
          ) : (
            ""
          )}
          {selectedMenu === "장바구니" ? (
            <FaShoppingCart style={{ color: " #527853" }} />
          ) : (
            ""
          )}
          {selectedMenu === "내 정보" ? (
            <FaUser style={{ color: " #527853" }} />
          ) : (
            ""
          )}{" "}
          {""}
          {selectedMenu}
        </h2>

        <div className="mypageContent">
          {/* 관심 도서 컴포넌트 */}
          {selectedMenu === "관심 도서" ? <InterestedBook /> : ""}

          {/* 장바구니 컴포넌트 */}
          {selectedMenu === "장바구니" ? <Cart /> : ""}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
