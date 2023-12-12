import { useState } from "react";
import "./Search.css";
//리액트 아이콘
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";

const SeachBookCard = ({ book }) => {
  const [onHeart, setOnHeart] = useState(false); //하트 클릭 시 색상 변경
  const [interestBook, setinterestBook] = useState(""); //관심도서 isbn
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  //관심 추가
  const handleClick = async () => {
    if (!onHeart) {
      if (confirm("관심 도서에 추가하겠습니까?")) {
        const user = auth.currentUser;
        if (!user) {
          alert("로그인이 필요한 서비스입니다.");
          navigate("/user/login");
        } else {
          setOnHeart(true);
          setinterestBook(book.isbn);
          //console.log(book.isbn);
        }
        console.log(interestBook);
        if (isLoading || interestBook === "") return;

        try {
          setLoading(true); //로딩시작

          //파이어 스토어에 저장
          await addDoc(collection(db, "interestBooks"), {
            interestBook, //BOOK ID
            createdAt: Date.now(), // 생성일자 오늘
            username: user.displayName, // 유저 이름
            userId: user.uid, // 유저 아이디
          });
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      } else {
        alert("취소");
        return;
      }
    } else if (onHeart) {
      if (confirm("관심 도서에서 제거하겠습니까?")) {
        alert("확인");
        setOnHeart(false);
        //데이터 베이스에서 지워야함
        await deleteDoc(collection(db, "interestBooks", interestBook));
      } else {
        return;
      }
    }
  };

  return (
    <>
      <div className="searchBook">
        <div className="searchBookLeft">
          <div>
            <a href={book.link}>
              <img src={book.cover} alt="img" />
            </a>
          </div>
          <div className="book_info">
            <div className="book_title">
              <a href={book.link}>{book.title}</a>
            </div>
            <p>저자/아티스트 : {book.author}</p>
            <p>출판사 : {book.publisher}</p>
            <p>출판일자 : {book.pubDate}</p>
            <div style={{ display: "flex" }}>
              <span
                style={{
                  fontSize: "1.2rem",
                  color: "green",
                  fontWeight: "bold",
                  margin: "5px",
                }}
              >
                10%
              </span>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  margin: "5px",
                }}
              >
                {book.priceSales}원
              </p>
              <p
                style={{
                  textDecoration: "line-through",
                  lineHeight: "26px",
                  letterSpacing: "-0.01em",
                  fontWeight: "lighter",
                  fontSize: "1.1rem",
                  margin: "5px",
                }}
              >
                {book.priceStandard}원
              </p>
              <p
                style={{
                  lineHeight: "26px",
                  letterSpacing: "-0.01em",
                  fontWeight: "lighter",
                  fontSize: "0.9rem",
                  margin: "5px",
                }}
              >
                {" "}
                | {book.mileage}p 적립
              </p>
            </div>
            <p>
              <FaStar style={{ color: "#FFF78A" }} />
              <span style={{ fontSize: "0.9rem" }}>
                {" "}
                {`(${book.customerReviewRank})`}
              </span>
            </p>
          </div>
        </div>
        <div className="SearchBookCard-Btn">
          <div>
            {!onHeart ? (
              <IoIosHeartEmpty
                onClick={handleClick}
                style={{ color: "red", fontSize: "1.5rem", cursor: "pointer" }}
              />
            ) : (
              <IoMdHeart
                onClick={handleClick}
                style={{ color: "red", fontSize: "1.5rem", cursor: "pointer" }}
              />
            )}
          </div>
          <button>장바구니</button>
          <button>구매하기</button>
          <button>재고조회</button>
        </div>
      </div>
    </>
  );
};

export default SeachBookCard;
