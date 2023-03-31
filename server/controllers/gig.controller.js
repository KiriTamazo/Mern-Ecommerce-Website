import GigModel from "../models/gig.model.js";
import createError from "../ulti/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError("403", "Only Seller can create"));
  }
  const newGig = new GigModel({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await GigModel.findById(req.params.id);
    console.log(gig, "req");
    if (gig.userId !== req.userId) {
      return next(createError(403, "You can delete only your gig"));
    }
    await GigModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted");
  } catch (err) {
    next(err);
  }
};
export const getGigs = async (req, res, next) => {
  const query = req.query;
  const filters = {
    ...(query.userId && { userId: query.userId }),
    ...(query.category && { category: query.category }),
    ...((query.min || query.max) && {
      price: {
        ...(query.min && { $gt: query.min }),
        ...(query.max && { $lt: query.max }),
      },
    }),
    ...(query.search && {
      title: { $regex: query.search, $options: "i" },
    }),
  };
  try {
    const gigs = await GigModel.find(filters).sort({ [query.sort]: -1 });
    console.log(gigs, "gigs");
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const gig = await GigModel.findById(req.params.id);
    if (!gig) {
      next(createError(404, "Gig Not Found"));
    }
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};
