import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import BookList from "./components/BookList";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <main>
          <div className="event_cate">
            <ul>
              <li>
                <a href="">이달의 이벤트</a>
              </li>
              <li>
                <a href="">이달의 이벤트</a>
              </li>
              <li>
                <a href="">이달의 이벤트</a>
              </li>
              <li>
                <a href="">이달의 이벤트</a>
              </li>
            </ul>
          </div>
          <div className="main_event ">
            <BookList type="ItemEditorChoice" />
          </div>
          <h3 className="main_title">신간 전체 리스트</h3>
          <div className="bookList">
            <BookList type="itemNewAll" />
          </div>
          <h3 className="main_title">주목할 만한 신간 리스트</h3>
          <div className="bookList">
            <BookList type="ItemNewSpecial" />
          </div>
        </main>
        <footer>
          <div>Copyright ⓒ (주)알라딘커뮤니케이션 All Rights reserved.</div>
        </footer>
      </div>
    </>
  );
}

export default App;
