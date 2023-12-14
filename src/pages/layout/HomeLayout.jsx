import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Searchbar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
