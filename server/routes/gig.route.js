import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();
router.get("/", getGigs);
router.post("/", verifyToken, createGig);
router.get("/single/:id", getGig);
router.delete("/:id", verifyToken, deleteGig);

export default router;
