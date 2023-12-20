require("dotenv").config();
//server.js
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const PORT = 5000;

// 알라딘 api cors 지우기const express = require("express");
app.use(cors({ origin: true, credentials: true })); // cors 허용
app.use(express.json());

// 베스트 셀러 조회
app.get("/ItemList.aspx", async (req, res) => {
  //쿼리 값 받기
  const queryType = "Bestseller";
  const aladinApiUrl = `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.BOOK_API_KEY}&QueryType=${queryType}&MaxResults=10&start=1&SearchTarget=Book&output=js&Cover=Big&CategoryId&Version=20131101`;

  try {
    // 알라딘 서버에 검색 요청
    const response = await axios.get(aladinApiUrl);
    const data = response.data;
    const result = data.item;
    // 응답을 받으면 클라이언트에게 전달
    if (result) {
      res.status(200).json(result); // Sending 'result' as JSON response
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
// 신간 전체 리스트
app.get("/ItemList.aspx", async (req, res) => {
  //쿼리 값 받기
  const queryType = "Bestseller";
  const aladinApiUrl = `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.BOOK_API_KEY}&QueryType=${queryType}&MaxResults=10&start=1&SearchTarget=Book&output=js&Cover=Big&CategoryId&Version=20131101`;

  try {
    // 알라딘 서버에 검색 요청
    const response = await axios.get(aladinApiUrl);
    const data = response.data;
    const result = data.item;
    // 응답을 받으면 클라이언트에게 전달
    if (result) {
      res.status(200).json(result); // Sending 'result' as JSON response
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// 주목 신간 리스트
app.get("/ItemList.aspx", async (req, res) => {
  //쿼리 값 받기
  const queryType = "Bestseller";
  const aladinApiUrl = `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.BOOK_API_KEY}&QueryType=${queryType}&MaxResults=10&start=1&SearchTarget=Book&output=js&Cover=Big&CategoryId&Version=20131101`;

  try {
    // 알라딘 서버에 검색 요청
    const response = await axios.get(aladinApiUrl);
    const data = response.data;
    const result = data.item;
    // 응답을 받으면 클라이언트에게 전달
    if (result) {
      res.status(200).json(result); // Sending 'result' as JSON response
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 에서 서버 실행중`);
});
