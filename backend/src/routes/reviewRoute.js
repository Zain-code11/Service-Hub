import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { customerOnly } from "../middlewares/roleMiddleware.js";
import {
  create,
  update,
  getReviews,
  getByBooking,
  getMyReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

// Customer creates review
router.post("/", protect, customerOnly, create);

// Customer updates review
router.put("/:id", protect, customerOnly, update);

// Get review by booking
router.get("/booking/:bookingId", protect, customerOnly, getByBooking);

// Get customer reviews
router.get("/my/all", protect, customerOnly, getMyReviews);

// Service reviews
router.get("/service/:serviceId", getReviews);
router.get("/:serviceId", getReviews);

export default router;
