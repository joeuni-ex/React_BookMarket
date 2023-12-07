import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BookCard from "../../components/BookCard";
// import "../../components/BookList.css";
import "./Search.css";
import SeachBookCard from "./SearchBookCard";

const Search = () => {
  //검색어로 넘어오는 파라미터 가져오기
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q"); // q에 해당하는 값을 쿼리스트링에서 가져옴
  const [resultBooks, setResultBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, [query]);

  const fetchBooks = async () => {
    const response = await fetch(
      `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${
        import.meta.env.VITE_BOOK_API
      }&Query=${query}&QueryType=title&MaxResults=10&start=1&SearchTarget=Book&Cover=Big&output=js&Version=20131101`
    );
    const data = await response.json();
    setResultBooks(data.item);
    console.log(resultBooks);
  };

  return (
    <>
      <p style={{ marginBottom: "30px" }}>
        "<span style={{ fontWeight: "bold" }}>{query}</span>"의 검색 결과
      </p>
      <div className="searchBookList">
        {resultBooks.map((book) => (
          <SeachBookCard key={book.itemId} book={book} />
        ))}
      </div>
    </>
  );
};

export default Search;
