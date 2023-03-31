import "./Navbar.scss";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../Sidebar/Sidebar";
import Switch from "../Switch/Switch";
import useClickOutSide from "../../hooks/useClickOutSide";
import useScrollLock from "../../hooks/useScrollLock";
import apiRequest from "../../ultis/apiRequest";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const modalRef = useRef();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useClickOutSide(modalRef, () => setOpen(false));
  const { lockScroll, unlockScroll } = useScrollLock();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // For mobile sidebar
  const handleOpenSidebar = () => {
    if (openSidebar) {
      unlockScroll();
      setOpenSidebar(false);
    } else {
      setOpenSidebar(true);
      lockScroll();
    }
  };
  // For loggedin user to show pop up modal for more option
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };
  // For Log out
  const handleLogOut = async () => {
    try {
      await apiRequest.post("auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const onScroll = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={
          active || pathname !== "/"
            ? `navbar active  ${window.scrollY > 0 ? "shadow animate" : ""}`
            : "navbar "
        }
      >
        <nav className="container">
          <div className="mobile-menu" onClick={handleOpenSidebar}>
            <Bars3Icon />
          </div>
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <span className="text">Allure</span>
            </Link>
            <span className="dot">.</span>
          </div>
          {/* Nav Links */}
          <ul className="links">
            {/* <a className="link" href="#business">
              Bussiness
            </a>
            <Link className="link" to="/">
              Explore
            </Link> */}
            <NavLink
              className={({ isActive }) =>
                isActive ? "links active" : "links"
              }
              to="/gigs"
            >
              Gigs
            </NavLink>

            {!currentUser && (
              <Link className="link" to="/login">
                Sign In
              </Link>
            )}
            {!currentUser && (
              <Link to="/register" className="join">
                Join
              </Link>
            )}
            {currentUser && (
              <div className="user" onClick={toggleModal}>
                <img src={currentUser?.img || "/img/noavatar.jpg"} alt="" />
                <span>{currentUser?.userName}</span>
                <div ref={modalRef} aria-hidden={open} className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/myGigs">My Gigs</Link>
                      <Link to="/add">Add New Gig</Link>
                    </>
                  )}
                  {/* <Link to="/orders">Orders</Link>
                  <Link to="/messages">Messages</Link> */}
                  <Link className="logout" onClick={handleLogOut}>
                    Logout
                  </Link>
                </div>
              </div>
            )}
            <Switch />
          </ul>
        </nav>
        {/* {active && <hr />}
        {(active || pathname !== "/") && (
          <ul className="menu">
            <div className="container">
              <Link to="/">Graphic & Design</Link>
              <Link to="/">Video & Animation</Link>
              <Link to="/">Writing & Translation</Link>
              <Link to="/">AI Services</Link>
              <Link to="/">Digital Marketing</Link>
              <Link to="/">Music & Audio</Link>
              <Link to="/">Programming & Tech</Link>
            </div>
          </ul>
        )} */}
      </header>
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        handleOpenSidebar={handleOpenSidebar}
        unlockScroll={unlockScroll}
      />
    </>
  );
};

export default Navbar;
