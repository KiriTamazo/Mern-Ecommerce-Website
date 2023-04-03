import { StarIcon } from "@heroicons/react/24/solid";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  StarIcon as StarOutLineIcon,
} from "@heroicons/react/24/outline";

import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../ultis/apiRequest";
import "./Review.scss";
const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      apiRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <>
      <div className="item">
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="user">
            <img className="pp" src={data.img || "/img/noavatar.jpg"} alt="" />
            <div className="info">
              <span>{data.userName}</span>
              <div className="country">
                <span>{data.country}</span>
              </div>
            </div>
          </div>
        )}
        <div className="rate-star">
          {Array(review.star)
            .fill()
            .map((item, i) => (
              <StarIcon key={i} />
            ))}
          {review?.star === 0 && <StarOutLineIcon />}
          <span>{review.star}</span>
        </div>
        <p>{review.desc}</p>
        <div className="helpful">
          <span>Helpful?</span>
          <HandThumbUpIcon />
          <span>Yes</span>
          <HandThumbDownIcon />
          <span>No</span>
        </div>
      </div>
      <hr />
    </>
  );
};
export default Review;
