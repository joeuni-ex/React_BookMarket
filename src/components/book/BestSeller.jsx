import React, { useEffect, useState } from "react";
import "./BookList.css";
import BookCard from "./BookCard";

const BestSeller = ({ type }) => {
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

  let count = 1;
  return (
    <>
      {books.map((book) => (
        <div className="bestSeller" key={book.itemId}>
          <div style={{ display: "flex", height: "100%" }}>
            <p style={{ fontWeight: "bold" }}>{count++}</p>
          </div>
          <BookCard book={book} />
        </div>
      ))}
    </>
  );
};

export default BestSeller;
