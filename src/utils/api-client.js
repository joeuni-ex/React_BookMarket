import axios from "axios";

//axios에 미리 백엔드 앞부분 주소를 저장한다.
export default axios.create({
  baseURL: "https://bookstore-backend-ni9g.onrender.com",
});
