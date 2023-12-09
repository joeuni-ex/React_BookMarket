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
          <a href={book.link}>{book.title.trim().slice(0, 15) + "..."}</a>
          <p style={{ fontSize: "0.8rem" }}>
            {book.author.trim().slice(0, 15)}
          </p>
        </div>
      </div>
    </>
  );
};

export default BookCard;
