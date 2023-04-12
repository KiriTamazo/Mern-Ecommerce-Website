import { useEffect, useState } from "react";
import "./Darkmode.scss";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
const DarkMode = ({ label }) => {
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

  return (
    <div onClick={handleChecked} className="dark-mode-wrapper">
      {label && <p className="dark-mode-label">Dark</p>}
      {check ? (
        <SunIcon className="dark-mode-icon" />
      ) : (
        <MoonIcon className="dark-mode-icon" />
      )}
    </div>
  );
};
export default DarkMode;
