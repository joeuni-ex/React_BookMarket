import React, { useEffect, useState } from "react";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [resultBooks, setResultBooks] = useState([]); //검색 결과
  const [showResults, setShowResults] = useState(false); // 결과 보이기 여부
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const response = await fetch(
      `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${
        import.meta.env.VITE_BOOK_API
      }&Query=${searchValue}&QueryType=title&MaxResults=7&start=1&SearchTarget=Book&Cover=Big&output=js&Version=20131101`
    );
    const data = await response.json();
    setResultBooks(data.item);
    console.log(resultBooks);
  };

  //검색어 실시간 검색기능
  useEffect(() => {
    if (searchValue.trim() !== "") {
      fetchBooks();
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchValue]);

  //만약 검색창에 focus가 잡히지 않으면 사라짐
  const handleFocus = () => {
    if (searchValue.trim() !== "") {
      setShowResults(true);
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
            <ul>
              {resultBooks.map((book) => (
                <a href={book.link} key={book.id}>
                  <li>{book.title}</li>
                </a>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
