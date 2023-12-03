import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import BookList from "./components/BookList";

import MainBanner from "./components/MainBanner";
import Searchbar from "./components/Searchbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Search from "./pages/search/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
          <main>
            <Searchbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/join" element={<Join />} />
              <Route path="/login" element={<Login />} />
              <Route path="/notfound" element={<NotFound />} />
            </Routes>
          </main>
          <footer>
            <div>Copyright ⓒ (주)알라딘커뮤니케이션 All Rights reserved.</div>
          </footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
