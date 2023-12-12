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
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect } from "react";

const SeachBookCard = ({ book }) => {
  const [onHeart, setOnHeart] = useState(false); //하트 클릭 시 색상 변경
  const [getInterestBook, setGetInterestBook] = useState([]);
  const [interestBook, setinterestBook] = useState(""); //관심도서 isbn
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const addInterestBook = async () => {
      //console.log(interestBook);
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
    };
    addInterestBook();
  }, [interestBook]);

  //관심 추가
  const handleClick = async () => {
    if (!onHeart) {
      if (confirm("관심 도서에 추가하겠습니까?")) {
        if (!user) {
          alert("로그인이 필요한 서비스입니다.");
          navigate("/user/login");
        } else {
          setOnHeart(true);
          // Update database directly here
          try {
            await addDoc(collection(db, "interestBooks"), {
              interestBook: book.isbn, //BOOK ID
              createdAt: Date.now(), // 생성일자 오늘
              username: user.displayName, // 유저 이름
              userId: user.uid, // 유저 아이디
            });
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        alert("취소");
        return;
      }
    } else if (onHeart) {
      if (confirm("관심 도서에서 제거하겠습니까?")) {
        setOnHeart(false);
        if (user) {
          try {
            const q = query(
              collection(db, "interestBooks"),
              where("userId", "==", user.uid),
              where("interestBook", "==", book.isbn)
            );
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (doc) => {
              try {
                await deleteDoc(doc.ref);
                console.log("Deleted successfully!");
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
      //현재 로그인중인 유저의 관심 목록만 가져온다
      const q = query(
        collection(db, "interestBooks"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const userInterestBooks = snapshot.docs.map(
        (doc) => doc.data().interestBook
      );
      const isBookInInterest = userInterestBooks.includes(book.isbn);
      setOnHeart(isBookInInterest);
    };

    fetchInterestBooks();
  }, [book.isbn, user.uid]);

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
