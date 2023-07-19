import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import "./Popup.scss";
import useClickOutSide from "../../hooks/useClickOutSide";
const HelperPopup = ({ message }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const popRef = useClickOutSide(handleClose);
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div ref={popRef}>
      <QuestionMarkCircleIcon onClick={handleShow} className="helper-icon" />
      <div className={`helper-popup ${show ? "show" : ""}`}>
        <div className="message">
          <p>Email : </p>
          <p>testseller@gmail.com</p>
          <p>Password : </p>
          <p>testseller</p>
          <hr />
          <p>Email : </p>
          <p>testuser@gmail.com</p>
          <p>Password : </p>
          <p>testuser</p>
        </div>
      </div>
    </div>
  );
};
export default HelperPopup;
