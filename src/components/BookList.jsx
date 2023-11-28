import React, { useEffect, useState } from "react";
import "./BookList.css";
import BookCard from "./BookCard";

const BookList = ({ type }) => {
  const [books, setBooks] = useState([]);
  //신간 리스트 (10개)
  const fetchBooks = async () => {
    const response = await fetch(
      `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${
        import.meta.env.VITE_BOOK_API
      }&QueryType=${type}&MaxResults=10&start=1&SearchTarget=Book&Cover=Big&output=js&Version=20131101`
    );
    const data = await response.json();
    setBooks(data.item);
    console.log(data.item);
  };

  useEffect(() => {
    fetchBooks();
  }, [type]);

  return (
    <>
      {books.map((book) => (
        <BookCard key={book.itemId} book={book} />
      ))}
    </>
  );
};

export default BookList;
