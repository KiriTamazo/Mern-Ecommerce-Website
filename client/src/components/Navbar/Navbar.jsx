import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const currentUser = {
  id: 1,
  userName: "John Doe",
  isSeller: true,
};

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
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
    <header className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <nav className="container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <span className="text">Allure</span>
          </Link>
          <span className="dot">.</span>
        </div>
        {/* Nav Links */}
        <ul className="links">
          <Link to="/">Allure Bussiness</Link>
          <Link to="/">Explore</Link>
          <Link to="/">English</Link>
          {!currentUser?.isSeller && <li>Become a Seller</li>}
          <Link to="/">Sign In</Link>
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <div className="user" onClick={toggleModal}>
              <img
                src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
                alt=""
              />
              <span>{currentUser?.userName}</span>
              <div aria-hidden={open} className="options">
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
        </ul>
      </nav>
      {active && <hr />}
      {(active || pathname !== "/") && (
        <ul className="menu">
          <Link to="/">Graphic & Design</Link>
          <Link to="/">Video & Animation</Link>
          <Link to="/">Writing & Translation</Link>
          <Link to="/">AI Services</Link>
          <Link to="/">Digital Marketing</Link>
          <Link to="/">Music & Audio</Link>
          <Link to="/">Programming & Tech</Link>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
