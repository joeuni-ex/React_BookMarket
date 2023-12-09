import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Join from "./pages/user/Join";
import Login from "./pages/user/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Search from "./pages/search/Search";
import HomeLayout from "./pages/layout/HomeLayout";
import UserLayout from "./pages/layout/UserLayout";

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
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
