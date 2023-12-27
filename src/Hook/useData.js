import { useEffect, useState } from "react";
import apiClient from "../utils/api-client";

const useData = (endpoint, customConfig, deps) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // 초기값을 true로 변경

  useEffect(
    () => {
      setIsLoading(true); // 데이터 요청 전에 로딩 상태로 설정
      apiClient
        .get(endpoint, customConfig)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message), setIsLoading(false);
        });
    },
    deps ? deps : []
  );

  return { data, error, isLoading };
};

export default useData;
