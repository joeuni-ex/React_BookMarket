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

// 베스트 셀러/신간 리스트 조회
app.get("/ItemList", async (req, res) => {
  //쿼리 값 받기
  const { queryType } = req.query;
  const aladinApiUrl = `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.BOOK_API_KEY}&QueryType=${queryType}&MaxResults=10&start=1&SearchTarget=Book&output=js&Cover=Big&CategoryId&Version=20131101`;

  try {
    // 알라딘 서버에 검색 요청
    const response = await axios.get(aladinApiUrl);
    const data = response.data;
    const result = data.item;
    // 응답을 받으면 클라이언트에게 전달
    if (result) {
      res.status(200).json(result); // Sending 'result' as JSON response
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// 실시간 도서 검색
app.get("/ItemSearch", async (req, res) => {
  //쿼리 값 받기
  const { Query } = req.query;
  const aladinApiUrl = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${process.env.BOOK_API_KEY}&Query=${Query}&QueryType=title&MaxResults=7&start=1&SearchTarget=Book&Cover=Big&output=js&Version=20131101`;

  try {
    // 알라딘 서버에 검색 요청
    const response = await axios.get(aladinApiUrl);
    const data = response.data;
    const result = data.item;
    // 응답을 받으면 클라이언트에게 전달
    if (result) {
      res.status(200).json(result); // Sending 'result' as JSON response
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// 실시간 검색 상세보기
app.get("/ItemLookUp", async (req, res) => {
  //쿼리 값 받기
  const { itemId } = req.query;
  const aladinApiUrl = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.BOOK_API_KEY}&output=js&Version=20131101&itemIdType=ISBN&ItemId=${itemId}&Cover=MidBig&OptResult=ebookList,usedList,reviewList,ratingInfo`;

  try {
    // 알라딘 서버에 검색 요청
    const response = await axios.get(aladinApiUrl);
    const data = response.data;
    const result = data.item;
    // 응답을 받으면 클라이언트에게 전달
    if (result) {
      res.status(200).json(result); // Sending 'result' as JSON response
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// 도서 검색 & 정렬 & 출력 개수 옵션
app.get("/ItemSearchPage", async (req, res) => {
  //쿼리 값 받기
  const { Query } = req.query;
  const { MaxResults } = req.query;
  const { Sort } = req.query;
  const aladinApiUrl = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${process.env.BOOK_API_KEY}&Query=${Query}&QueryType=title&MaxResults=${MaxResults}&start=1&SearchTarget=Book&Cover=Big&Sort=${Sort}&output=js&Version=20131101`;

  try {
    // 알라딘 서버에 검색 요청
    const response = await axios.get(aladinApiUrl);
    const data = response.data;
    const result = data.item;
    // 응답을 받으면 클라이언트에게 전달
    if (result) {
      res.status(200).json(result); // Sending 'result' as JSON response
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 에서 서버 실행중`);
});
