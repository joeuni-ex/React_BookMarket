import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import BookList from "./components/BookList";
import MainBookList from "./components/MainBookList";
import MainSub from "./components/MainSub";
import { mainLinks } from "./data";
import Tesx from "./components/Tesx";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <main>
          {/* <div className="event_cate">
            <ul>
              <li>
                <a href="">베스트 셀러</a>
              </li>
            </ul>
          </div>
          <div className="main_event ">
       
            <MainBookList type="Bestseller" />
          </div> */}
          <div className="main_banner">
            <div className="main_banner_text">
              <p style={{ color: "black" }}>Book</p>
              <p>Store</p>
            </div>

            <MainSub />
            <div className="main_banner_list">
              <ul>
                {mainLinks.map((link) => (
                  <li key={link.id}>
                    <a href="">{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className="main_sub_container"></div> */}
          <h3 className="main_title">신간 전체 리스트</h3>
          <div className="bookList">
            <BookList type="itemNewAll" />
          </div>
          <h3 className="main_title">주목할 만한 신간 리스트</h3>
          <div className="bookList">
            <BookList type="ItemNewSpecial" />
          </div>
          <div style={{ width: "80%" }}>
            <Tesx />
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
