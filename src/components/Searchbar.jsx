import React from "react";
import "./SearchBar.css";

const Searchbar = () => {
  return (
    <>
      <div className="searchSection">
        <form>
          <input
            type="text"
            className="search"
            placeholder="검색어를 입력하세요."
          />
          <input type="submit" className="searchBtn" />
        </form>
      </div>
    </>
  );
};

export default Searchbar;
