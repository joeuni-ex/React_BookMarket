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
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";

const SeachBookCard = ({ book }) => {
  const [onHeart, setOnHeart] = useState(false); //하트 클릭 시 색상 변경
  const navigate = useNavigate();
  const user = auth.currentUser;

  //관심 도서에 추가 및 제거 트리거
  const handleClick = async () => {
    //일단 이미 관심 도서에 추가되어 있는지 확인한다.
    // 1. 관심도서에 없는 도서의 경우
    if (!onHeart) {
      //confirm 창으로 추가할건지 여부 물어봄
      // 1-1) 확인 클릭
      if (confirm("관심 도서에 추가하겠습니까?")) {
        if (!user) {
          //유저가 없으면(로그인 되어있지 않을 경우)
          alert("로그인이 필요한 서비스입니다.");
          navigate("/user/login"); //로그인 페이지로 이동
        } else {
          //로그인 되어있으면 하트 색상 변경하고
          setOnHeart(true);
          //DB에 저장한다.
          try {
            await addDoc(collection(db, "interestBooks"), {
              //컬렉션명 -interestBooks
              interestBook: book.isbn, //book id
              bookTitle: book.title, //book title
              bookCover: book.cover, //book cover
              bookLink: book.link, //book link
              bookAuthor: book.author, //book author
              bookPublisher: book.publisher, //book publisher
              createdAt: Date.now(), // 생성일자 오늘
              username: user.displayName, // 유저 이름
              userId: user.uid, // 유저 아이디
            });
          } catch (error) {
            console.log(error); //에러는 콘솔에 출력
          }
        }
        // 1-2) 취소 클릭 - 리턴
      } else {
        alert("취소");
        return;
      }
      // 2. 이미 관심 도서에 있는 경우(삭제)
    } else if (onHeart) {
      if (confirm("관심 도서에서 제거하겠습니까?")) {
        setOnHeart(false); //제거 확인 버튼 누르면 하트 색상 변경
        //2-1)유저가 있으면(로그인)
        if (user) {
          try {
            //쿼리문 작성
            const q = query(
              collection(db, "interestBooks"), // 삭제할 컬렉션 지정
              where("userId", "==", user.uid), // 현재 로그인되어있는 유저와 같은 것
              where("interestBook", "==", book.isbn) //book.isbn 으로 찾음
            );
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (doc) => {
              try {
                await deleteDoc(doc.ref); //삭제한다.
                console.log("관심 도서 삭제 성공!");
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
    }
  };

  useEffect(() => {
    //관심목록 가져오는 함수
    const fetchInterestBooks = async () => {
      if (user) {
        //유저가 있을 경우
        const q = query(
          collection(db, "interestBooks"),
          where("userId", "==", user.uid) //로그인 한 유저와 동일한 데이터만
        );

        const snapshot = await getDocs(q); // 데이터를 다 가져올 때 까지 기다림

        const userInterestBooks = snapshot.docs.map(
          (doc) => doc.data().interestBook
        );

        //가져온 관심 도서에 해당 되는 도서의 경우 ture로 리턴
        const isBookInInterest = userInterestBooks.includes(book.isbn);
        setOnHeart(isBookInInterest);
      }
    };

    fetchInterestBooks();
  }, [book.isbn, user]); // 로그인 유저와 book.isbn 변경될 때 마다 실행

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
        </div>
      </div>
    </>
  );
};

export default SeachBookCard;
