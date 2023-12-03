import React, { useState } from "react";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

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
    //  console.log(searchValue);
  };

  return (
    <>
      <div className="searchSection">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              onChange={handleChange}
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
      </div>
    </>
  );
};

export default Searchbar;
