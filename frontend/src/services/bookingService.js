import api from "./api";

export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

export const getMyBooking = async () => {
  const response = await api.get("/bookings/my");
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.patch(`/bookings/${id}/cancel`);
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await api.delete(`/bookings/${id}`);
  return response.data;
};

export const deleteProviderBooking = async (id) => {
  const response = await api.delete(`/bookings/provider/${id}`);
  return response.data;
};

export const getReceiveBooking = async () => {
  const response = await api.get("/bookings/received");
  return response.data;
};

export const updateBookingStatus = async (bookingId, status) => {
  const response = await api.patch(`/bookings/${bookingId}/status`, { status });
  return response.data;
};
