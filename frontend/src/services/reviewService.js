import api from "./api";

export const createReview = async (reviewData) => {
  const response = await api.post(
    "/reviews",
    reviewData
  );

  return response.data;
};

export const updateReview = async (reviewId, reviewData) => {
  const response = await api.put(
    `/reviews/${reviewId}`,
    reviewData
  );

  return response.data;
};

export const getReviewByBooking = async (bookingId) => {
  const response = await api.get(
    `/reviews/booking/${bookingId}`
  );

  return response.data;
};

export const getMyReviews = async () => {
  const response = await api.get(
    "/reviews/my/all"
  );

  return response.data;
};

export const getServiceReviews = async (serviceId) => {
  const response = await api.get(
    `/reviews/${serviceId}`
  );

  return response.data;
};
