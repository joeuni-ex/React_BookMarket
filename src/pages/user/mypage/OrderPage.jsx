import {
  collection,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const user = auth.currentUser;
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    //주문 내역 가져오는 함수
    const fetchUserCart = async () => {
      if (user) {
        //유저가 있을 경우
        const q = query(
          collection(db, "cart"),
          where("userId", "==", user.uid), //로그인 한 유저와 동일한 데이터만
          where("order", "==", true), //주문 완료
          orderBy("orderDate", "desc") //최신순
        );
        //실시간 가져오기
        onSnapshot(q, (snapshot) => {
          const userCart = snapshot.docs.map((doc) => doc.data());
          const amountResult = snapshot.docs.map((doc) => doc.data().amount);
          setUserCart(userCart);

          //console.log(totalPrice);
        });
      }
    };

    fetchUserCart();
  }, [user]); // 로그인 유저가 변경 될 때마다 실행

  console.log(userCart);
  return (
    <>
      <div className="sortOrder">
        <ul>
          <li>주문번호</li>
          <li>주문날짜</li>
          <li id="orderTitle">상품명</li>
          <li>개수</li>
          <li>주문금액</li>
          <li>주문상태</li>
        </ul>
      </div>
      {userCart.length >= 1
        ? userCart.map((order, index) => {
            const orderDate =
              order.orderDate && order.orderDate.toDate
                ? order.orderDate.toDate()
                : new Date(order.orderDate);
            const formattedDate =
              orderDate instanceof Date && !isNaN(orderDate)
                ? orderDate.toLocaleDateString()
                : "Invalid Date";

            return (
              <div className="order" key={index}>
                <div className="orderHeader"></div>
                <div className="orderBody">
                  <div className="orderBodyCon">{order.orderNumber}</div>
                  <div className="orderBodyCon">{formattedDate}</div>
                  <div className="orderBodyTitle">{order.bookTitle}</div>
                  <div className="orderBodyCon">{order.amount}</div>
                  <div className="orderBodyCon">
                    {order.salesPrice * order.amount}
                  </div>
                  <div className="orderBodyCon">
                    {order.orderState && order.orderState === "before"
                      ? "배송전"
                      : ""}
                  </div>
                </div>
                <div className="orderFooter"></div>
              </div>
            );
          })
        : ""}
    </>
  );
};

export default OrderPage;
