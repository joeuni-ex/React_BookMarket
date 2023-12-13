import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import "./UserPage.css";
import { collection, getDocs, query, where } from "firebase/firestore";

const UserPage = () => {
  const user = auth.currentUser;
  const [selectedMenu, setSelectedMenu] = useState("관심 도서");
  const [getInterestBook, setGetInterestBook] = useState([]);

  //메뉴 선택
  const handleChange = (value) => {
    setSelectedMenu(value);
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

        const userInterestBooks = snapshot.docs.map((doc) => doc.data());
        setGetInterestBook(userInterestBooks);
      }
    };

    fetchInterestBooks();
  }, [user]); // 로그인 유저가 변경 될 때마다 실행

  console.log(getInterestBook);
  return (
    <div className="userpageContainer">
      <div className="aside">
        <h3>마이페이지</h3>
        <br />
        <ul>
          <li onClick={() => handleChange("관심 도서")}>관심 도서</li>
          <li onClick={() => handleChange("장바구니")}>장바구니</li>
          <li onClick={() => handleChange("구매하기")}>구매하기</li>
        </ul>
      </div>
      <div className="mypage">
        <h2>{selectedMenu}</h2>

        <div className="mypageContent">
          {getInterestBook.map((book) => (
            <>
              <div className="interestBook" key={book.interestBook}>
                <a href={book.bookLink}>
                  <img src={book.bookCover} alt="관심도서" />
                </a>

                <p>{book.bookTitle}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
