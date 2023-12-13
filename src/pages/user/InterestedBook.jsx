import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
// 리액트 아이콘
import { MdBookmarkRemove } from "react-icons/md";

const InterestedBook = () => {
  const user = auth.currentUser;
  const [getInterestBook, setGetInterestBook] = useState([]);

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

  // console.log(getInterestBook);

  const handleRemove = async (value) => {
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
  };

  return (
    <>
      {getInterestBook.map((book, index) => (
        <div className="interestBook" key={index}>
          <div className="interestBookContent">
            <img src={book.bookCover} alt="관심도서" />
            <span className="removeBook">
              <MdBookmarkRemove
                onClick={() => handleRemove(book.interestBook)}
              />
            </span>
          </div>
          <a href={book.bookLink}>{book.bookTitle.trim().slice(0, 15)}</a>
          <p></p>
        </div>
      ))}
    </>
  );
};

export default InterestedBook;
