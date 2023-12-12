import { useState } from "react";
import "./Search.css";
//리액트 아이콘
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaStar } from "react-icons/fa";

const SeachBookCard = ({ book }) => {
  const [heart, setHeart] = useState(false);

  const handleClick = () => {
    setHeart(!heart);
  };

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
            {!heart && (
              <IoIosHeartEmpty
                onClick={handleClick}
                style={{ color: "red", fontSize: "1.5rem", cursor: "pointer" }}
              />
            )}
            {heart && (
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
