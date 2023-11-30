import { useEffect, useState } from "react";
import "./MainBookList.css";
import BookCard from "./BookCard";

const MainBookList = ({ type }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await fetch(
      `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${
        import.meta.env.VITE_BOOK_API
      }&QueryType=${type}&MaxResults=10&start=1&SearchTarget=Book&Cover=Big&output=js&Version=20131101`
    );
    const data = await response.json();
    setBooks(data.item);
  };

  useEffect(() => {
    fetchBooks();
  }, [type]);

  // 가로 터치 드래그 스크롤링
  useEffect(() => {
    function scrollableContent(selector) {
      let isScrolling = false;
      let startX = 0;
      let scrollLeft = 0;

      const scrollableContent = document.querySelector(selector);

      scrollableContent.addEventListener("mousedown", (e) => {
        isScrolling = true;
        startX = e.pageX - scrollableContent.offsetLeft;
        scrollLeft = scrollableContent.scrollLeft;
      });

      scrollableContent.addEventListener("mouseup", () => {
        isScrolling = false;
      });

      scrollableContent.addEventListener("mousemove", (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - scrollableContent.offsetLeft;
        const walk = (x - startX) * 1.5; // 조절 가능한 스크롤 속도
        scrollableContent.scrollLeft = scrollLeft - walk;
      });
    }
    scrollableContent(".scroll-container");
  }, []);

  return (
    <div className="scroll-container">
      <div className="scrollable-content">
        {books.map((book) => (
          <div className="item" key={book.itemId}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainBookList;
