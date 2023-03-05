import "./Sidebar.scss";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Switch from "../Switch/Switch";
import useClickOutSide from "../../hooks/useClickOutSide";
import { useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
const Sidebar = ({
  openSidebar,
  setOpenSidebar,
  handleOpenSidebar,
  unlockScroll,
}) => {
  const sideRef = useRef();
  const contentEl = useRef();
  useClickOutSide(sideRef, () => {
    unlockScroll();
    setOpenSidebar(false);
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div aria-hidden={openSidebar} className="overlay">
      <aside className="sidebar" ref={sideRef}>
        <div className="logo">
          <h1>Allure</h1>
          <XMarkIcon className="close" onClick={handleOpenSidebar} />
        </div>
        {/* menu */}
        <div className="accordian" onClick={handleOpen}>
          <div className="title">
            <h3>Browse Category</h3>
            <ChevronDownIcon className={open ? "active" : ""} />
          </div>
          <ul
            className="menu"
            ref={contentEl}
            aria-hidden={open}
            style={
              open
                ? { height: contentEl.current.scrollHeight }
                : { height: "0px" }
            }
          >
            <Link to="/">Graphic & Design</Link>
            <Link to="/">Video & Animation</Link>
            <Link to="/">Writing & Translation</Link>
            <Link to="/">AI Services</Link>
            <Link to="/">Digital Marketing</Link>
            <Link to="/">Music & Audio</Link>
            <Link to="/">Programming & Tech</Link>
          </ul>
        </div>
        {/* Nav Links */}

        <ul className="links">
          <p>General</p>
          <hr />
          <Link className="link" to="/">
            Allure Bussiness
          </Link>
          <Link className="link" to="/">
            Explore
          </Link>
          <Link className="link" to="/">
            English
          </Link>
        </ul>
        <Switch />
      </aside>
    </div>
  );
};
export default Sidebar;
