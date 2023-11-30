import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import BookList from "./components/BookList";
import MainBookList from "./components/MainBookList";
import MainSub from "./components/MainSub";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <main>
          <div className="event_cate">
            <ul>
              <li>
                <a href="">베스트 셀러</a>
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
            <MainBookList type="Bestseller" />
          </div>

          <div className="main_sub_container">
            {/* <div className="main_sub"> */}
            <MainSub />
            {/* </div> */}
            {/* <div className="main_sub2"></div> */}
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
