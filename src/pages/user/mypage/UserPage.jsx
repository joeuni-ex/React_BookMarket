import { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import "./Userpage.css";

// 리액트 아이콘
import InterestedBook from "./InterestedBook";
import { useLocation } from "react-router-dom";
import OrderPage from "./OrderPage";

const UserPage = () => {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("order"); // q에 해당하는 값을 쿼리스트링에서 가져옴
  const user = auth.currentUser;
  const [selectedMenu, setSelectedMenu] = useState("관심 도서");

  //주문 완료에서 넘어올 때
  useEffect(() => {
    if (query === "true") {
      setSelectedMenu("주문 목록");
    }
  }, [query]);

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

          <li onClick={() => handleChange("주문 목록")}>주문/결제 목록</li>
        </ul>
      </div>
      <div className="mypage">
        <h2>{selectedMenu}</h2>

        <div className="mypageContent">
          {/* 관심 도서 컴포넌트 */}
          {selectedMenu === "관심 도서" ? <InterestedBook /> : ""}
          {selectedMenu === "주문 목록" ? <OrderPage /> : ""}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
