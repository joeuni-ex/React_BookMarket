import React, { useEffect, useState } from "react";
import "./Searchbar.css";
// 리액트 라우터
import { useNavigate } from "react-router-dom";
// 리액트 아이콘
import { FaStar } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [resultBooks, setResultBooks] = useState([]); //검색 결과
  const [showResults, setShowResults] = useState(false); // 결과 보이기 여부
  const [bookDetails, setBookDetails] = useState({}); //검색 상세보기
  const [onFocus, setOnFocus] = useState(null); // 포커스 상태

  const navigate = useNavigate();
  const [isbnError, setIsbnError] = useState("");

  const fetchBooks = async () => {
    const response = await fetch(
      `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${
        import.meta.env.VITE_BOOK_API
      }&Query=${searchValue}&QueryType=title&MaxResults=7&start=1&SearchTarget=Book&Cover=Big&output=js&Version=20131101`
    );
    const data = await response.json();
    setResultBooks(data.item);
    // console.log(resultBooks);
  };

  //실시간 검색 상세보기
  const fetchBookDetails = async (itemId) => {
    const response = await fetch(
      `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${
        import.meta.env.VITE_BOOK_API
      }&output=js&Version=20131101&itemIdType=ISBN&ItemId=${itemId}&Cover=MidBig&OptResult=ebookList,usedList,reviewList,ratingInfo`
    );
    const data = await response.json();

    //data.item[0] 요소가 비어있을 때 오류 방지
    if (data.item && data.item.length > 0) {
      setBookDetails({ ...bookDetails, [itemId]: data.item[0] });
    } else {
      //console.log(data.errorMessage);
      setIsbnError(data.errorMessage);
    }
  };

  //검색어 실시간 검색기능
  useEffect(() => {
    if (searchValue.trim() !== "") {
      fetchBooks();
      setShowResults(true);
      setOnFocus(null);
    } else {
      setShowResults(false);
    }
  }, [searchValue]);

  useEffect(() => {}, [bookDetails]);

  //만약 검색창에 focus가 잡히지 않으면 사라짐
  const handleFocus = (itemId) => {
    if (searchValue.trim() !== "") {
      setIsbnError("");
      setShowResults(true);
      fetchBookDetails(itemId);
      setOnFocus(itemId);
    }
  };

  const handleBlur = () => {
    setShowResults(false);
  };

  //submit 시
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchValue === "") {
      alert("내용을 입력해 주세요!");
    } else {
      setSearchValue(e.target.value);
      navigate(`/search?q=${searchValue}`); //q= 검색어로 요청한다.
      setSearchValue("");
    }
  };

  //검색어 입력 시
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    //console.log(searchValue);
  };

  return (
    <>
      <div className="searchSection">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={searchValue}
              type="text"
              className="search"
              placeholder="검색어를 입력하세요."
            />
            <button type="submit" className="searchBtn">
              <FaSearch />
            </button>
          </label>
        </form>
        {showResults && resultBooks && (
          <div className="resultBooks">
            <div className="resultTitle">
              <ul>
                {resultBooks.map((book) => (
                  <a key={book.itemId} href={book.link}>
                    <li onMouseEnter={() => handleFocus(book.isbn)}>
                      {book.title.trim().slice(0, 30) + "..."}
                    </li>
                  </a>
                ))}
              </ul>
            </div>
            <div className="resultDetail">
              {isbnError[onFocus] && <p>{isbnError.errorMessage}</p>}
              {bookDetails[onFocus] && (
                <>
                  <div className="resultDetailHead">
                    <div className="resultDetailCover">
                      <a href={bookDetails[onFocus].link}>
                        <img src={bookDetails[onFocus].cover} alt="" />
                      </a>
                    </div>
                    <div>
                      <a
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        href={bookDetails[onFocus].link}
                      >
                        <p
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            margin: "5px",
                          }}
                        >
                          {bookDetails[onFocus].title}
                        </p>
                      </a>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          margin: "5px",
                        }}
                      >
                        {bookDetails[onFocus].publisher}
                      </p>
                      <div style={{ display: "flex" }}>
                        <span
                          style={{
                            fontSize: "0.8rem",
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
                            fontSize: "0.8rem",
                            margin: "5px",
                          }}
                        >
                          {bookDetails[onFocus].priceSales}원
                        </p>
                        <p
                          style={{
                            textDecoration: "line-through",
                            lineHeight: "18px",
                            letterSpacing: "-0.01em",
                            fontWeight: "lighter",
                            fontSize: "0.8rem",
                            margin: "5px",
                          }}
                        >
                          {bookDetails[onFocus].priceStandard}원
                        </p>
                        <p>
                          <FaStar
                            style={{ color: "#FFF78A", fontSize: "0.8rem" }}
                          />
                          <span style={{ fontSize: "0.8rem" }}>
                            {" "}
                            {`(${bookDetails[onFocus].customerReviewRank})`}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* {console.log(bookDetails[onFocus].item[0])} */}
                  </div>
                  <div className="resultDetailBody">
                    {bookDetails[onFocus].description.length > 1 ? (
                      <p>{bookDetails[onFocus].description}</p>
                    ) : (
                      <p>상세 설명이 없습니다.</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
