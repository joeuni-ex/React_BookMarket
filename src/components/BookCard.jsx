import React from "react";
import "./BookCard.css";

const BookCard = ({ book }) => {
  return (
    <>
      <div className="book">
        <a href={book.link}>
          <img src={book.cover} alt="img" />
        </a>
        <div className="book_title">
          <a href={book.link}>{book.title}</a>
        </div>
        <div>
          <a href={book.link}></a>
        </div>
      </div>
    </>
  );
};

export default BookCard;
