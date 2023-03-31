import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <section className="errorPage">
      <div className="container">
        <h1>404 Page Not Found!</h1>
        <Link to="/">Return to home page</Link>
      </div>
    </section>
  );
};
export default NotFound;
