import { useEffect, useState } from "react";
import "./Switch.scss";
const Switch = ({ label }) => {
  const dark = localStorage.theme === "dark" ? true : false;
  const [check, setCheck] = useState(dark || false);
  const handleChecked = () => {
    setCheck((prev) => !prev);
  };
  useEffect(() => {
    if (check) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [check]);
  console.log(!!label, "label");
  return (
    <>
      <div className="toggleWrapper" aria-label={!!label}>
        <input
          type="checkbox"
          className="dn"
          id="dn"
          checked={check}
          onChange={handleChecked}
        />
        <label htmlFor="dn" className="toggle">
          <span className="toggle__handler">
            <span className="crater crater--1"></span>
            <span className="crater crater--2"></span>
            <span className="crater crater--3"></span>
          </span>
          <span className="star star--1"></span>
          <span className="star star--2"></span>
          <span className="star star--3"></span>
          <span className="star star--4"></span>
          <span className="star star--5"></span>
          <span className="star star--6"></span>
        </label>
      </div>
    </>
  );
};
export default Switch;
