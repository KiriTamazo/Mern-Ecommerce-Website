import createError from "../ulti/createError.js";
import ReviewModel from "../models/review.model.js";
import GigModel from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers cant create a Review"));

  const newReview = new ReviewModel({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await ReviewModel.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (review)
      return next(createError(403, "You have already created a review"));
    const savedReview = await newReview.save();
    await GigModel.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(200).send(savedReview);
  } catch (error) {
    next(error);
  }
};
export const getReviews = async (req, res, next) => {
  try {
    const review = await ReviewModel.find({ gigId: req.params.gigId });
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
