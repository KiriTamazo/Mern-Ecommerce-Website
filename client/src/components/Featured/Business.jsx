import { CheckCircleIcon } from "@heroicons/react/24/outline";
import "./Business.scss";
const Business = () => {
  return (
    <section id="business" className="business">
      <div className="container">
        <div className="item">
          <h2>
            Allure <span className="thin"> Business.</span>
            <span className="badge">new</span>
          </h2>
          <h1>
            A business sollution design for <i>teams</i>
          </h1>
          <p>
            Upgrade to a curated experience packed with tools and benefits
            ,dedicates to the business
          </p>
          <div className="title">
            <CheckCircleIcon />
            Connect to freelancers with proven business experience
          </div>
          <div className="title">
            <CheckCircleIcon />
            Get matched with perfect talent by a customer success manager
          </div>
          <div className="title">
            <CheckCircleIcon />
            Manage teamwork and boost productivity with one powerful workspace
          </div>
          <button>Explore Allure Business</button>
        </div>
        <div className="item">
          <img src="./img/business.png" alt="" />
        </div>
      </div>
    </section>
  );
};
export default Business;
