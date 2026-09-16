import Booking from "../models/booking.js";
import Service from "../models/service.js";

export const createBooking = async (customerId, serviceId, data) => {
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new Error("Service not found");
  }
  const booking = await Booking.create({
    customer: customerId,
    service: serviceId,
    provider: service.provider,
    price: service.price,
    bookingDate: data.bookingDate,
    message: data.message,
  });
  return booking;
};

export const getCustomerBookings = async (customerId) => {
  return await Booking.find({ customer: customerId })
    .populate("service", "title price")
    .populate("provider", "name phone");
};

export const getProviderBookings = async (providerId) => {
  return await Booking.find({ provider: providerId })
    .populate("service", "title price")
    .populate("customer", "name phone");
};


export const updateBookingStatus = async (
  bookingId,
  providerId,
  status
) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    provider: providerId,
  });

  if (!booking) {
    throw new Error("Booking not found or not assigned to you");
  }

  // Pending booking can only be accepted or rejected
  if (booking.status === "pending") {
    if (!["accepted", "rejected"].includes(status)) {
      throw new Error("Pending booking can only be accepted or rejected");
    }
  }

  // Accepted booking can only be completed
  else if (booking.status === "accepted") {
    if (status !== "completed") {
      throw new Error("Accepted booking can only be completed");
    }
  }

  // Rejected or completed booking cannot be changed
  else {
    throw new Error(`Booking is already ${booking.status}`);
  }

  booking.status = status;

  await booking.save();

  return booking;
};

export const cancelBooking = async (bookingId, customerId) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    customer: customerId,
  });

  if (!booking) {
    throw new Error("Booking not found or not owned by you");
  }

  if (booking.status !== "pending") {
    throw new Error("Only pending bookings can be cancelled");
  }

  booking.status = "cancelled";

  await booking.save();

  return booking;
};

export const deleteCustomerBooking = async (bookingId, customerId) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    customer: customerId,
  });

  if (!booking) {
    throw new Error("Booking not found or not owned by you");
  }

  if (booking.status !== "cancelled") {
    throw new Error("Only cancelled bookings can be deleted");
  }

  await Booking.findByIdAndDelete(bookingId);
  return { message: "Booking deleted successfully" };
};

export const deleteProviderBooking = async (bookingId, providerId) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    provider: providerId,
  });

  if (!booking) {
    throw new Error("Booking not found or not assigned to you");
  }

  if (booking.status !== "rejected") {
    throw new Error("Only rejected bookings can be deleted");
  }

  await Booking.findByIdAndDelete(bookingId);
  return { message: "Rejected booking deleted successfully" };
};
