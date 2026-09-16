//* `bookingRoutes.js → Booking API endpoints define karta hai aur authentication/authorization middleware lagata hai.**

import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { customerOnly, providerOnly } from "../middlewares/roleMiddleware.js";
import {
  create,
  getMyBooking,
  getReceivedBookings,
  updateStatus,
  cancel,
  remove,
  removeProvider,
} from "../controllers/bookingController.js";
const router = express.Router();
router.post("/", protect, customerOnly, create);
router.get("/my", protect, customerOnly, getMyBooking);
router.get("/received", protect, providerOnly, getReceivedBookings);
router.patch("/:id/status", protect, providerOnly, updateStatus);
router.patch("/:id/cancel", protect, customerOnly, cancel);
router.delete("/:id", protect, customerOnly, remove);
router.delete("/provider/:id", protect, providerOnly, removeProvider);
export default router;
