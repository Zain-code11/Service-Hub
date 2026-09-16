import {
  createReview,
  updateReview,
  getServiceReviews,
  getReviewByBookingId,
  getCustomerReviews,
} from "../services/reviewService.js";

// Create Review
export const create = async (req, res) => {
  try {
    const { serviceId, bookingId, rating, comment } = req.body;

    const review = await createReview({
      customerId: req.user.userId,
      serviceId,
      bookingId,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review Created Successfully",
      review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Review
export const update = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await updateReview({
      reviewId: req.params.id,
      customerId: req.user.userId,
      rating,
      comment,
    });

    res.status(200).json({
      success: true,
      message: "Review Updated Successfully",
      review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Review by Booking
export const getByBooking = async (req, res) => {
  try {
    const review = await getReviewByBookingId(req.params.bookingId, req.user.userId);
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Service Reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await getServiceReviews(req.params.serviceId);

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Customer Reviews
export const getMyReviews = async (req, res) => {
  try {
    const reviews = await getCustomerReviews(req.user.userId);
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
