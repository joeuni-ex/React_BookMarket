import "./Cart.css";
// 리액트 아이콘
import { TiDeleteOutline } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import {
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
const Cart = () => {
  const user = auth.currentUser;
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    //장바구니 가져오는 함수
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

  //console.log(userCart);
  //장바구니 삭제
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

  // 수량 업데이트
  const updateCart = async (bookId, amount) => {
    //카트 컬렉션에서 인증 된 유저, 그리고 수량 선택하는 book의 id들어감
    const q = query(
      collection(db, "cart"),
      where("userId", "==", user.uid),
      where("interestBook", "==", bookId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      try {
        const docRef = doc.ref;
        await updateDoc(docRef, { amount: amount });
      } catch (error) {
        console.error(error);
      }
    });
  };

  //수량 변경 - 마이너스
  const handleMinus = (bookId, amount) => {
    if (amount >= 2) {
      const minusAmount = amount - 1;
      //console.log(minusAmount);
      //DB에서 마이너스 처리하기
      updateCart(bookId, minusAmount);
    } else {
      alert("최소 1개 이상 구매가능합니다.");
    }
  };

  //수량 변경 - 플러스
  const handlePlus = (bookId, amount) => {
    const plusAmount = amount + 1;
    //const plusAmount = num.toString();
    //DB에서 플러스 처리하기
    updateCart(bookId, plusAmount);
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
                      <div>
                        <TiDeleteOutline
                          onClick={() => handleRemoveCart(cart.interestBook)}
                          style={{ fontSize: "1.2rem", cursor: "pointer" }}
                        />
                      </div>

                      <div className="amountSection">
                        <div
                          onClick={() =>
                            handleMinus(cart.interestBook, cart.amount)
                          }
                          className="minus"
                        >
                          <FaMinus />
                        </div>
                        <div className="amount">{cart.amount}</div>
                        <div
                          onClick={() =>
                            handlePlus(cart.interestBook, cart.amount)
                          }
                          className="plus"
                        >
                          <FaPlus />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cartFooter">
                    <div>
                      <p>
                        상품금액 {cart.salesPrice}원 / 수량{cart.amount}개
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        총 {cart.salesPrice * cart.amount}원
                      </p>
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
                <div>
                  <p>총 수량</p>
                  <p>테스트</p>
                </div>
                <div>
                  <p>총 상품금액</p>
                  <p>테스트</p>
                </div>
                <div>
                  <p>배송비</p>
                  <p>2500원</p>
                </div>
                <div style={{ borderBottom: "none" }}>
                  <p>총 주문금액</p>
                  <p>테스트</p>
                </div>
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
