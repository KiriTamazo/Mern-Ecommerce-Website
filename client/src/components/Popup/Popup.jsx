import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import "./Popup.scss";
const HelperPopup = ({ message, show }) => {
  return (
    <div>
      <QuestionMarkCircleIcon className="helper-icon" />
      <div className={`helper-popup ${show ? "show" : ""}`}>
        <div className="message">{message}</div>
      </div>
    </div>
  );
};
export default HelperPopup;
