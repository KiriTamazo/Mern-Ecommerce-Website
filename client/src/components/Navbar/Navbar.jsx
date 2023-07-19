import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import apiRequest from "../../ultis/apiRequest";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const modalRef = useClickOutSide(() => setOpen(false));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // For loggedin user to show pop up modal for more option
  const toggleModal = () => {
    setOpen(!open);
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
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <span className="text">Allure</span>
            </Link>
            <span className="dot">.</span>
          </div>
          {/* Nav Links */}
          <ul className="links" ref={modalRef}>
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
                <div aria-hidden={open} className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/myGigs">My Gigs</Link>
                      <Link to="/add">Add New Gig</Link>
                    </>
                  )}

                  <Link className="links" to="/gigs">
                    Gigs
                  </Link>

                  <DarkMode label />
                  <Link className="logout" onClick={handleLogOut}>
                    Logout
                  </Link>
                </div>
              </div>
            )}
            <DarkMode />
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
