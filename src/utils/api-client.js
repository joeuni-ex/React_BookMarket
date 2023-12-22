import axios from "axios";

//axios에 미리 백엔드 앞부분 주소를 저장한다.
export default axios.create({
  baseURL: "https://react-bookstore-joeuni-ex.netlify.app",
});
