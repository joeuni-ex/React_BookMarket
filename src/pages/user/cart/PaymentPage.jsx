import "./PaymentPage.css";
// 리액트 아이콘
import { GoTriangleRight } from "react-icons/go";
// 파이어 베이스
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useEffect, useState } from "react";
//다음 주소 api
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
//리액트 라우터
import { useNavigate } from "react-router-dom";
import Spinner from "../../layout/Spinner";

const PaymentPage = () => {
  const user = auth.currentUser;
  const [userCart, setUserCart] = useState([]);
  const [amount, setAmount] = useState([]); // 현재 장바구니의 상품 수량
  const [totalAmount, setTotalAmount] = useState(null); //수량 합계
  const [totalPrice, setTotalPrice] = useState(null); //금액 합계
  const [userFullAddress, setFullAddress] = useState(""); //유저 주소
  const [userZoneCode, setUserZoneCode] = useState(""); //유저 우편번호
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    //장바구니 가져오는 함수
    const fetchUserCart = async () => {
      if (user) {
        //유저가 있을 경우
        const q = query(
          collection(db, "cart"),
          where("userId", "==", user.uid), //로그인 한 유저와 동일한 데이터만
          where("order", "==", false), //주문 하기 전 상품
          where("orderReady", "==", true)
        );
        //실시간 가져오기
        onSnapshot(q, (snapshot) => {
          const userCart = snapshot.docs.map((doc) => doc.data());
          const amountResult = snapshot.docs.map((doc) => doc.data().amount);
          setUserCart(userCart);
          setAmount(amountResult);
          //console.log(totalPrice);
        });
      }
      setIsLoading(false);
    };

    //총 상품 수량 합계 구하기
    const sumAmount = () => {
      const result = userCart.reduce((prev, current) => {
        return prev + current.amount;
      }, 0);
      setTotalAmount(result);
    };

    //총 상품 금액 합계 구하기
    const sumPrice = () => {
      const result = userCart.reduce((prev, current, index) => {
        //각 상품의 가격과 수량을 곱하여 합산한다.
        const itemTotalPrice = current.salesPrice * amount[index];
        return prev + itemTotalPrice;
      }, 0);
      setTotalPrice(result);
    };
    fetchUserCart();
    sumAmount();
    sumPrice();
  }, [user, userCart]); // 로그인 유저가 변경 될 때마다 실행

  //console.log(userCart);

  //다음 우편번호 찾기 API사용
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let zonecode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setFullAddress(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setUserZoneCode(zonecode);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const generateRandomOrderNumber = () => {
    // 랜덤 주문번호 생성 함수
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const charactersLength = characters.length;
    const length = 8; // 주문번호 길이 설정

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  //결제하기 클릭 할 경우 문서의 order을 업데이트한다.
  const handleOrderComplete = async (bookIds) => {
    setIsLoading(true);
    const orderNumber = generateRandomOrderNumber(); // 랜덤 주문번호 생성

    // 각각의 책(book) ID에 대해 주문을 완료합니다.
    bookIds.forEach(async (bookId) => {
      const q = query(
        collection(db, "cart"),
        where("userId", "==", user.uid),
        where("interestBook", "==", bookId),
        where("order", "==", false) //주문 하기 전 상품
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        try {
          const docRef = doc.ref;
          await updateDoc(docRef, {
            order: true, //주문완료
            orderNumber: orderNumber, //주문번호
            orderDate: Date.now(), //주문일자
            orderState: "before", //배송전
          });
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      });
    });
  };

  //결제하기 클릭 시
  const handleSubmit = () => {
    if (confirm("결제를 진행하시겠습니까?")) {
      const bookIds = userCart.map((cart) => cart.interestBook);
      handleOrderComplete(bookIds);
      navigate("/user/success");
    } else return;
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="orderContainer">
          <h2>결제하기</h2>
          <br />
          <div style={{ fontSize: "1.2rem" }}>
            주문 <GoTriangleRight />{" "}
            <span style={{ fontWeight: "bold" }}> 결제 </span>
            <GoTriangleRight /> 완료
          </div>
          <div className="orderMain">
            <div className="infoSection">
              <form onSubmit={handleSubmit}>
                <p className="title">주문자 정보</p>
                <p>
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                  표시가 있는 항목은 필수 항목입니다.
                </p>
                <p className="formLabel">
                  이름{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </p>
                <input className="infoInput" type="text" required />
                <p className="formLabel">
                  전화번호{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </p>
                <input
                  className="infoInput"
                  type="tel"
                  name=""
                  id=""
                  required
                />
                <p className="formLabel">이메일</p>
                <input className="infoInput" type="email" name="" id="" />
                <br />
                <p style={{ marginTop: "30px" }} className="title">
                  배송지 정보
                </p>
                <p>
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                  표시가 있는 항목은 필수 항목입니다.
                </p>
                <p className="formLabel">
                  수령인{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </p>
                <input className="infoInput" type="text" required />
                <p className="formLabel">
                  주소{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </p>
                <label className="userZoneCode">
                  <input type="text" defaultValue={userZoneCode} required />
                  <button type="button" onClick={handleClick}>
                    우편번호 검색
                  </button>
                </label>
                <br />
                <input
                  className="infoInput"
                  type="text"
                  defaultValue={userFullAddress}
                  required
                />
                <br />
                <input
                  className="infoInput"
                  type="text"
                  placeholder="상세주소"
                />

                <p className="formLabel">배송 메모</p>
                <input
                  className="infoInput"
                  type="text"
                  placeholder="배송 메모를 선택해 주세요."
                />
                <br />
                <div>
                  <input className="orderBtn" type="submit" value="결제하기" />
                </div>
              </form>
            </div>
            <div className="orderSection">
              <p className="title">주문 상품</p>
              {userCart &&
                userCart.map((cart, index) => (
                  <div className="cartAdded" key={index}>
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
              <div className="payment2">
                <div className="paymentHeader">
                  <p>주문 정보</p>
                </div>
                <div className="paymentBody">
                  <div>
                    <p>총 수량</p>
                    <p>{totalAmount}개</p>
                  </div>
                  <div>
                    <p>총 상품금액</p>
                    <p>{totalPrice}원</p>
                  </div>
                  <div>
                    <p>배송비</p>
                    <p>2500원</p>
                  </div>
                  <div style={{ borderBottom: "none" }}>
                    <p>총 주문금액</p>
                    <p>{totalPrice + 2500}원</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
