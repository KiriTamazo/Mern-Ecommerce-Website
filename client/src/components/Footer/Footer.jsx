import { footerLinks } from "../../data";
import "./Footer.scss";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="top">
          <ul className="item">
            {footerLinks.map(({ title, links }, i) => (
              <li key={i}>
                <h2>{title}</h2>
                {links.map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </li>
            ))}
          </ul>
        </div>
        <div className="bottom">
          <div className="left">
            <h1>Allure</h1>
            <p>&copy; Allure International Ltd. {date}</p>
          </div>
          <div className="right">
            <p>Design By LWHA</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
