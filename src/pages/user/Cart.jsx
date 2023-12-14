import "./Cart.css";
// 리액트 아이콘
import { TiDeleteOutline } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";

const Cart = () => {
  return (
    <>
      <div className="cartContainer">
        <h2>장바구니</h2>
        <div className="cartMain">
          <div className="cartSection">
            <div className="cart">
              <div className="cartHeader"></div>
              <div className="cartBody">
                <div className="img">
                  <img src="" alt="" />
                </div>

                <div className="cartBookDetail">
                  <p>title</p>
                  <p>author</p>
                  <p>price</p>
                </div>
                <div className="cartDeleteIcon">
                  <TiDeleteOutline
                    style={{ fontSize: "1.2rem", cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="cartFooter">
                <div>
                  <p>상품금액 10000원/수량1개</p>
                  <p style={{ fontWeight: "bold" }}>총 10000원</p>
                </div>
              </div>
            </div>
            <div className="cart">카트 입니다</div>
            <div className="cart">카트 입니다</div>
          </div>
          <div className="paymentSection">
            <div className="payment">
              <div className="paymentHeader">
                <p>주문 정보</p>
              </div>
              <div className="paymentBody">
                <ul>
                  <li>총 수량</li>
                  <li>총 상품금액</li>
                  <li>배송비</li>
                  <li style={{ borderBottom: "none" }}>총 주문금액</li>
                </ul>
              </div>
              <div className="paymentFooter">
                <div className="paymentBtn">주문하기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
