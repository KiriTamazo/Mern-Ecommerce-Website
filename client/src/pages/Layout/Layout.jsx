import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
