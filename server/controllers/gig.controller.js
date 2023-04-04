import GigModel from "../models/gig.model.js";
import createError from "../ulti/createError.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const deleteImages = async (id) => {
  try {
    const result = await cloudinary.api.delete_resources(id);
    
  } catch (e) {
    console.log(e)
  }
};

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
    const images = gig.imgs.map((x) => x.public_id);
    const publicIds = [gig.image.public_id, ...images];
    deleteImages(publicIds);
    if (gig.userId !== req.userId) {
      return next(createError(403, "You can delete only your gig"));
    }
    await GigModel.findByIdAndDelete(req.params.id);
    deleteImages();

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
