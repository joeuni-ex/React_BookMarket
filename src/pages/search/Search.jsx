import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  const [selectedSort, setSelectedSort] = useState("Accuracy"); //선택된 정렬
  const [maxResults, setMaxResults] = useState("15"); //최대 출력
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [selectedSort]); //정렬이 변경 될 때마다 실행(정렬 버튼의 active효과)

  //검색어,정렬, 출력개수 변경 시 재 실행
  useEffect(() => {
    fetchBooks();
  }, [query, sort, maxResults]);
  //

  const fetchBooks = async () => {
    setIsLoading(true);
    const response = await fetch(
      `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${
        import.meta.env.VITE_BOOK_API
      }&Query=${query}&QueryType=title&MaxResults=${maxResults}&start=1&SearchTarget=Book&Cover=Big&Sort=${sort}&output=js&Version=20131101`
    );
    const data = await response.json();
    setResultBooks(data.item);
    setIsLoading(false);
    //console.log(resultBooks);
  };

  //정렬하기
  const handleSortChange = (value) => {
    setSelectedSort(value);
    setSort(value);
  };
  //출력개수 지정
  const handleMaxResults = (e) => {
    setMaxResults(e.target.value);
    console.log(maxResults);
  };

  return (
    <>
      <p style={{ marginBottom: "30px" }}>
        "<span style={{ fontWeight: "bold" }}>{query}</span>"의 검색 결과
      </p>
      <div className="sort">
        <ul className="sortList">
          <li
            className={selectedSort === "Accuracy" ? "selected" : ""}
            onClick={() => handleSortChange("Accuracy")}
          >
            정확도순
          </li>
          <li
            className={selectedSort === "PublishTime" ? "selected" : ""}
            onClick={() => handleSortChange("PublishTime")}
          >
            출간일순
          </li>
          <li
            className={selectedSort === "Title" ? "selected" : ""}
            onClick={() => handleSortChange("Title")}
          >
            제목순
          </li>
          <li
            className={selectedSort === "SalesPoint" ? "selected" : ""}
            onClick={() => handleSortChange("SalesPoint")}
          >
            판매량순
          </li>
          <li
            className={selectedSort === "CustomerRating" ? "selected" : ""}
            onClick={() => handleSortChange("CustomerRating")}
          >
            고객평점순
          </li>
        </ul>

        <select value={maxResults} onChange={handleMaxResults}>
          <option value="15">15개</option>
          <option value="25">25개</option>
        </select>
      </div>
      <div className="searchBookList">
        {resultBooks.map((book) => (
          <SeachBookCard key={book.itemId} book={book} />
        ))}
        {isLoading && <p>로딩중...</p>}
      </div>
    </>
  );
};

export default Search;
