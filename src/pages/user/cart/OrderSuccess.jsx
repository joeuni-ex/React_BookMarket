//리액트 아이콘
import { GoTriangleRight } from "react-icons/go";
import { FaShoppingBag } from "react-icons/fa";
//파이어 베이스
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  return (
    <div className="orderContainer">
      <h2>주문완료</h2>
      <br />
      <div style={{ fontSize: "1.2rem" }}>
        주문 <GoTriangleRight /> 결제
        <GoTriangleRight /> <span style={{ fontWeight: "bold" }}> 완료</span>
      </div>
      <div
        style={{
          width: "500px",
          display: "flex",
          flexDirection: "column",
          marginTop: "30px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FaShoppingBag style={{ fontSize: "7rem" }} />
        </div>

        <p style={{ fontSize: "1.5rem", marginTop: "20px" }}>
          {user.displayName}님의 주문이 정상적으로 완료되었습니다.
        </p>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => navigate("/user/mypage")}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "150px",
              height: "50px",
              backgroundColor: "rgb(71, 71, 71)",
              color: "white",
              borderRadius: "7px",
              cursor: "pointer",
            }}
          >
            주문 상세 확인
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSuccess;
