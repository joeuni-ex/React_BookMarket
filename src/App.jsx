import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import BookList from "./components/BookList";

import MainBanner from "./components/MainBanner";
import Searchbar from "./components/Searchbar";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <main>
          <Searchbar />
          {/* 메인 배너 */}
          <div className="main_banner">
            <div className="main_banner_text">
              <p style={{ color: "black" }}>Book</p>
              <p>Store</p>
            </div>
            <MainBanner />
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
