import "./Cart.css";
// 리액트 아이콘
import { TiDeleteOutline } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";
import {
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
const Cart = () => {
  const user = auth.currentUser;
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    //관심목록 가져오는 함수
    const fetchUserCart = async () => {
      if (user) {
        //유저가 있을 경우
        const q = query(
          collection(db, "cart"),
          where("userId", "==", user.uid) //로그인 한 유저와 동일한 데이터만
        );
        //실시간 가져오기
        onSnapshot(q, (snapshot) => {
          const userCart = snapshot.docs.map((doc) => doc.data());
          setUserCart(userCart);
        });
      }
    };

    fetchUserCart();
  }, [user]); // 로그인 유저가 변경 될 때마다 실행

  console.log(userCart);

  const handleRemoveCart = async (value) => {
    if (confirm("장바구니에서 삭제하겠습니까?")) {
      //2-1)유저가 있으면(로그인)
      if (user) {
        try {
          //쿼리문 작성
          const q = query(
            collection(db, "cart"), // 삭제할 컬렉션 지정
            where("userId", "==", user.uid), // 현재 로그인되어있는 유저와 같은 것
            where("interestBook", "==", value) //book.isbn 으로 찾음
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            try {
              await deleteDoc(doc.ref); //삭제한다.
              console.log("장바구니 삭제 성공!");
            } catch (error) {
              console.error("Error deleting document:", error);
            }
          });
        } catch (error) {
          console.error("Error querying document:", error);
        }
      }
    } else {
      return;
    }
  };

  return (
    <>
      <div className="cartContainer">
        <h2>장바구니</h2>
        <div className="cartMain">
          <div className="cartSection">
            {userCart &&
              userCart.map((cart, index) => (
                <div className="cart" key={index}>
                  <div className="cartHeader"></div>
                  <div className="cartBody">
                    <div className="img">
                      <img src={cart.bookCover} alt="" />
                    </div>

                    <div className="cartBookDetail">
                      <p>{cart.bookTitle}</p>
                      <p>{cart.bookAuthor}</p>
                      <p>{cart.salesPrice}원</p>
                    </div>
                    <div className="cartDeleteIcon">
                      <TiDeleteOutline
                        onClick={() => handleRemoveCart(cart.interestBook)}
                        style={{ fontSize: "1.2rem", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <div className="cartFooter">
                    <div>
                      <p>상품금액 {cart.salesPrice}원/수량1개</p>
                      <p style={{ fontWeight: "bold" }}>총 10000원</p>
                    </div>
                  </div>
                </div>
              ))}
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
