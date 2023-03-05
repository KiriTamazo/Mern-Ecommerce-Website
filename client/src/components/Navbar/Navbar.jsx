import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../Sidebar/Sidebar";
import Switch from "../Switch/Switch";
import useClickOutSide from "../../hooks/useClickOutSide";
import useScrollLock from "../../hooks/useScrollLock";
const currentUser = {
  id: 1,
  userName: "John Doe",
  isSeller: true,
};

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [openSidebar, setOpenSidebar] = useState(false);

  const modalRef = useRef();
  const handleOpenSidebar = () => {
    if (openSidebar) {
      unlockScroll();
      setOpenSidebar(false);
    } else {
      setOpenSidebar(true);
      lockScroll();
    }
  };

  useClickOutSide(modalRef, () => setOpen(false));
  const { lockScroll, unlockScroll } = useScrollLock();

  const toggleModal = () => {
    setOpen((prev) => !prev);
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
        className={active || pathname !== "/" ? "navbar active" : "navbar"}
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
            <Link className="link" to="/">
              Allure Bussiness
            </Link>
            <Link className="link" to="/">
              Explore
            </Link>
            <Link className="link" to="/">
              English
            </Link>
            {!currentUser?.isSeller && (
              <Link className="link" to="/">
                Become a Seller
              </Link>
            )}
            {!currentUser && (
              <Link className="link" to="/">
                Sign In
              </Link>
            )}
            {!currentUser && <button className="join">Join</button>}
            {currentUser && (
              <div className="user" onClick={toggleModal}>
                <img
                  src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
                  alt=""
                />
                <span>{currentUser?.userName}</span>
                <div ref={modalRef} aria-hidden={open} className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/mygigs">Gigs</Link>
                      <Link to="/add">Add New Gig</Link>
                    </>
                  )}
                  <Link to="/orders">Orders</Link>
                  <Link to="/messages">Messages</Link>
                  <Link to="">Logout</Link>
                </div>
              </div>
            )}
            <Switch />
          </ul>
        </nav>
        {active && <hr />}
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
        )}
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
