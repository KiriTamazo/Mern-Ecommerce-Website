import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import "./Popup.scss";
const HelperPopup = ({ message }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <>
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
    </>
  );
};
export default HelperPopup;
