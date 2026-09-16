import Review from "../models/Review.js";
import Booking from "../models/booking.js";
import Service from "../models/service.js";

// Create Review
export const createReview = async ({
  customerId,
  serviceId,
  bookingId,
  rating,
  comment,
}) => {
  // Check service
  const service = await Service.findById(serviceId);

  if (!service) {
    throw new Error("Service not found");
  }

  // Check booking
  const booking = await Booking.findOne({
    _id: bookingId,
    customer: customerId,
    service: serviceId,
  });

  if (!booking) {
    throw new Error("Booking not found or does not belong to you");
  }

  // Review only after completed booking
  if (booking.status !== "completed") {
    throw new Error("You can review only completed bookings");
  }

  // Prevent duplicate review
  const existingReview = await Review.findOne({
    customer: customerId,
    booking: bookingId,
  });

  if (existingReview) {
    throw new Error("You have already reviewed this booking");
  }

  // Create review
  const review = await Review.create({
    customer: customerId,
    service: serviceId,
    booking: bookingId,
    rating,
    comment,
  });

  return review;
};

// Update Review
export const updateReview = async ({
  reviewId,
  customerId,
  rating,
  comment,
}) => {
  const review = await Review.findOne({
    _id: reviewId,
    customer: customerId,
  });

  if (!review) {
    throw new Error("Review not found or not owned by you");
  }

  review.rating = rating;
  review.comment = comment;
  await review.save();

  return review;
};

// Get Review by Booking
export const getReviewByBookingId = async (bookingId, customerId) => {
  return Review.findOne({
    booking: bookingId,
    customer: customerId,
  });
};

// Get Reviews of a Service
export const getServiceReviews = async (serviceId) => {
  return Review.find({ service: serviceId })
    .populate("customer", "name")
    .sort({ createdAt: -1 });
};

// Get Customer Reviews
export const getCustomerReviews = async (customerId) => {
  return Review.find({ customer: customerId })
    .populate("service", "title price")
    .sort({ createdAt: -1 });
};
