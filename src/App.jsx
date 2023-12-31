import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Join from "./pages/user/Join";
import Login from "./pages/user/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Search from "./pages/search/Search";
import HomeLayout from "./pages/layout/HomeLayout";
import UserLayout from "./pages/layout/UserLayout";
import UserPage from "./pages/user/mypage/UserPage";
import Cart from "./pages/user/cart/Cart";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useState } from "react";
import Spinner from "./pages/layout/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentPage from "./pages/user/cart/PaymentPage";
import OrderSuccess from "./pages/user/cart/OrderSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "join", element: <Join />, errorElement: <NotFound /> },
      { path: "login", element: <Login />, errorElement: <NotFound /> },
      {
        //회원만 사용 가능함
        path: "mypage",
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ),
        errorElement: <NotFound />,
      },
      {
        //회원만 사용 가능함
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
        errorElement: <NotFound />,
      },
      {
        //회원만 사용 가능함
        path: "payment",
        element: (
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        ),
        errorElement: <NotFound />,
      },
      {
        //회원만 사용 가능함
        path: "success",
        element: (
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        ),
        errorElement: <NotFound />,
      },
    ],
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    // 최초 인증 상태가 완료될 때 실행되는 Promise를 return
    // Firebase가 쿠키와 토큰을 읽고 백엔드와 소통해서 로그인 여부를 확인하는 동안 기다림
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return <>{isLoading ? <Spinner /> : <RouterProvider router={router} />}</>;
}

export default App;
