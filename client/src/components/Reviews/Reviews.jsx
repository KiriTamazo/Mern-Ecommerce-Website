import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../ultis/apiRequest";
import InputField from "../InputField/InputField";
import Review from "../Review/Review";
import { useForm } from "react-hook-form";
import "./Review.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
const reviewSchema = yup
  .object()
  .shape({
    desc: yup.string(),
  })
  .required();
const Reviews = ({ gigId, user }) => {
  const [select, setSelect] = useState(0);
  const [hover, setHover] = useState(0);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reviewSchema),
  });
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: reviewData,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      apiRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const onSubmit = (data) => {
    mutation.mutate({
      gigId,
      desc: data?.desc,
      star: select,
    });
  };
  const mutation = useMutation({
    mutationFn: (newData) => {
      return apiRequest.post("/reviews", newData);
    },
    onError: (error) => {
      setError("desc", { message: error.response.data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
  return (
    /* Review */
    <div className="reviews">
      <h2>Reviews</h2>
      {/* List of Reviews */}
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong!"
      ) : reviewData?.length < 1 ? (
        <p className="no-review">No Review yet</p>
      ) : (
        reviewData?.map((review) => {
          return <Review review={review} key={review.id} />;
        })
      )}
      {/* Add Review */}
      <div className="addReview">
        <h3>Add a Review</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="review-star">
            {[...Array(5)].map((star, i) => {
              i += 1;

              return (
                <button
                  type="button"
                  key={`star-${i}`}
                  onDoubleClick={() => {
                    setHover(0);
                    setSelect(0);
                  }}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(select)}
                  className={i <= (hover || select) ? "on" : "off"}
                  onClick={() => {
                    setSelect(i);
                  }}
                >
                  <span className="star-icon">&#9733;</span>
                </button>
              );
            })}
          </div>
          <div className="reviewField">
            <InputField
              type="text"
              name="desc"
              placeholder="Leave a Review"
              register={register}
              errors={errors.desc}
            />
            <button
              className="submit"
              // onClick={handleSubmit(onSubmit)}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Reviews;
