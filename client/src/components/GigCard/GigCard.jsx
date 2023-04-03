import { Link } from "react-router-dom";
import "./GigCard.scss";
import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../ultis/apiRequest";
const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigUser"],
    queryFn: () =>
      apiRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/gig/${item.id}`}>
      <div className="gigCard">
        <img src={item?.image?.url} alt="" />
        <div className="info">
          {isLoading ? (
            "Loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.userName}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="rate-star">
            <StarIcon />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
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
