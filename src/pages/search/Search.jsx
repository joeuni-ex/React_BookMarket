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
  const [sort, setSort] = useState("Accuracy"); //정렬

  //검색어 변경 시 재 실행
  useEffect(() => {
    fetchBooks();
  }, [query, sort]);

  const fetchBooks = async () => {
    const response = await fetch(
      `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${
        import.meta.env.VITE_BOOK_API
      }&Query=${query}&QueryType=title&MaxResults=20&start=1&SearchTarget=Book&Cover=Big&Sort=${sort}&output=js&Version=20131101`
    );
    const data = await response.json();
    setResultBooks(data.item);
    console.log(resultBooks);
  };

  //정렬하기
  const handleSortChange = (e) => {
    setSort(e.target.value);
    console.log(sort);
  };

  return (
    <>
      <p style={{ marginBottom: "30px" }}>
        "<span style={{ fontWeight: "bold" }}>{query}</span>"의 검색 결과
      </p>
      <div className="sort">
        <form>
          <label>
            <input
              onClick={handleSortChange}
              type="radio"
              name="sort"
              value="Accuracy"
              checked
            />
            정확도순
          </label>
          <label>
            <input
              onClick={handleSortChange}
              type="radio"
              name="sort"
              value="PublishTime"
            />
            출간일순
          </label>
          <label>
            <input
              onClick={handleSortChange}
              type="radio"
              name="sort"
              value="SalesPoint"
            />
            판매량순
          </label>
          <label>
            <input
              onClick={handleSortChange}
              type="radio"
              name="sort"
              value="CustomerRating"
            />
            고객평점순
          </label>
        </form>

        {/* <select value={sort} onChange={handleSortChange}>
          <option value="Accuracy">정확도순</option>
          <option value="PublishTime ">출간일순</option>
          <option value="SalesPoint ">판매량순</option>
          <option value="CustomerRating">고객평점순</option>
        </select> */}
      </div>
      <div className="searchBookList">
        {resultBooks.map((book) => (
          <SeachBookCard key={book.itemId} book={book} />
        ))}
      </div>
    </>
  );
};

export default Search;
