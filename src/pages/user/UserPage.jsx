import { useState } from "react";
import { auth } from "../../firebase";
import "./UserPage.css";

// 리액트 아이콘
import { IoBookmarks } from "react-icons/io5";
import InterestedBook from "./InterestedBook";

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
          <li onClick={() => handleChange("구매하기")}>구매하기</li>
        </ul>
      </div>
      <div className="mypage">
        <h2>
          {selectedMenu}
          {""} <IoBookmarks style={{ color: " #527853" }} />
        </h2>

        <div className="mypageContent">
          <InterestedBook />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
