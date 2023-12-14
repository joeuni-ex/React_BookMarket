import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { TiDeleteOutline } from "react-icons/ti";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// 리액트 아이콘

const InterestedBook = () => {
  const user = auth.currentUser;
  const [getInterestBook, setGetInterestBook] = useState([]);
  const [addedCart, setAddedCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //관심목록 가져오는 함수
    const fetchInterestBooks = async () => {
      if (user) {
        //유저가 있을 경우
        const q = query(
          collection(db, "interestBooks"),
          where("userId", "==", user.uid) //로그인 한 유저와 동일한 데이터만
        );
        //실시간 가져오기
        onSnapshot(q, (snapshot) => {
          const userInterestBooks = snapshot.docs.map((doc) => doc.data());
          setGetInterestBook(userInterestBooks);
        });
      }
    };

    fetchInterestBooks();
  }, [user]); // 로그인 유저가 변경 될 때마다 실행

  //console.log(getInterestBook);

  //관심 도서에서 삭제
  const handleRemove = async (value) => {
    if (addedCart === false) {
      if (confirm("관심 도서에서 제거하겠습니까?")) {
        //2-1)유저가 있으면(로그인)
        if (user) {
          try {
            //쿼리문 작성
            const q = query(
              collection(db, "interestBooks"), // 삭제할 컬렉션 지정
              where("userId", "==", user.uid), // 현재 로그인되어있는 유저와 같은 것
              where("interestBook", "==", value) //book.isbn 으로 찾음
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
    } else if (addedCart === true) {
      if (user) {
        try {
          //쿼리문 작성
          const q = query(
            collection(db, "interestBooks"), // 삭제할 컬렉션 지정
            where("userId", "==", user.uid), // 현재 로그인되어있는 유저와 같은 것
            where("interestBook", "==", value) //book.isbn 으로 찾음
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            try {
              await deleteDoc(doc.ref); //삭제한다.
              setAddedCart(false);
            } catch (error) {
              console.error("Error deleting document:", error);
            }
          });
        } catch (error) {
          console.error("Error querying document:", error);
        }
      }
    }
  };

  //장바구니에 추가
  const AddCart = async (book) => {
    if (!confirm("장바구니에 추가하겠습니까?")) {
      alert("취소");
      return;
    }

    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/user/login"); // Redirect to login page
      return;
    }

    //DB에 저장한다.
    try {
      await addDoc(collection(db, "cart"), {
        //컬렉션명 -interestBooks
        interestBook: book.interestBook, //book id
        bookTitle: book.bookTitle, //book title
        bookCover: book.bookCover, //book cover
        bookLink: book.bookLink, //book link
        bookAuthor: book.bookAuthor, //book author
        bookPublisher: book.bookPublisher, //book publisher
        salesPrice: book.salesPrice, // book sales Price
        amount: 1,
        createdAt: Date.now(), // 생성일자 오늘
        username: user.displayName, // 유저 이름
        userId: user.uid, // 유저 아이디
      });
      alert("장바구니에 추가되었습니다!");
      try {
        //쿼리문 작성
        const q = query(
          collection(db, "interestBooks"), // 삭제할 컬렉션 지정
          where("userId", "==", user.uid), // 현재 로그인되어있는 유저와 같은 것
          where("interestBook", "==", book.interestBook) //book.isbn 으로 찾음
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          try {
            await deleteDoc(doc.ref); //삭제한다.
            setAddedCart(false);
          } catch (error) {
            console.error("Error deleting document:", error);
          }
        });
      } catch (error) {
        console.error("Error querying document:", error);
      }
      navigate("/user/cart");
    } catch (error) {
      console.log(error); //에러는 콘솔에 출력
    }
  };

  return (
    <>
      {getInterestBook.map((book, index) => (
        <div className="interestBook" key={index}>
          <div className="interestHeader">
            <div className="removeBook">
              <TiDeleteOutline
                onClick={() => handleRemove(book.interestBook)}
              />
            </div>
          </div>
          <div className="interestBookContent">
            <div className="InterestImg">
              <a href={book.bookLink}>
                <img src={book.bookCover} alt="관심도서" />
              </a>
            </div>
            <div className="interestDetail">
              <a href={book.bookLink}>
                <p>{book.bookTitle}</p>
              </a>
              <p>{book.bookAuthor.trim().slice(0, 16)}</p>
              <p>{book.salesPrice}원</p>
              <div className="interestBtnCon">
                <div
                  onClick={() => {
                    AddCart(book);
                  }}
                  className="interestBtn"
                >
                  장바구니
                </div>
              </div>
            </div>
          </div>
          <div className="interestBookFooter"></div>
        </div>
      ))}
    </>
  );
};

export default InterestedBook;
