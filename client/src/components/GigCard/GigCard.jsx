import { Link } from "react-router-dom";
import "./GigCard.scss";
import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";
const GigCard = ({ item }) => {
  return (
    <Link to="/gig/123">
      <div className="gigCard">
        <img src={item.img} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="rate-star">
            <StarIcon />
            <span>{item.star}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <HeartIcon />
          <div className="price">
            <span>Starting At</span>
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default GigCard;
