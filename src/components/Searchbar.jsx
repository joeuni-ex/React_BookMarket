import React from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <>
      <div className="searchSection">
        <form>
          <label htmlFor="">
            <input
              type="text"
              className="search"
              placeholder="검색어를 입력하세요."
            />
            <a href="" className="searchBtn">
              <FaSearch />
            </a>
          </label>
        </form>
      </div>
    </>
  );
};

export default Searchbar;
