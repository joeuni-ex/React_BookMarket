import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
