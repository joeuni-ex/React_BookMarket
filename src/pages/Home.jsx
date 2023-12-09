import React from "react";
import MainBanner from "../components/MainBanner";
import BookList from "../components/BookList";
import Searchbar from "../components/Searchbar";

const Home = () => {
  return (
    <>
      {/* 메인 배너 */}
      <div className="main_banner">
        <div className="main_banner_text">
          <p style={{ color: "black" }}>Book</p>
          <p>Store</p>
        </div>
        <MainBanner />
      </div>
      <h3 className="main_title">베스트셀러 </h3>
      <div className="bookList">
        <BookList type="Bestseller" />
      </div>
      <h3 className="main_title">신간 전체 리스트</h3>
      <div className="bookList">
        <BookList type="itemNewAll" />
      </div>
      <h3 className="main_title">주목할 만한 신간 리스트</h3>
      <div className="bookList">
        <BookList type="ItemNewSpecial" />
      </div>
    </>
  );
};

export default Home;
