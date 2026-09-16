// `bookingController.js → Booking requests ko handle karta hai aur service layer ko call karta hai.**

import {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  updateBookingStatus,
  cancelBooking,
  deleteCustomerBooking,
  deleteProviderBooking,
} from "../services/bookingService.js";

export const create = async (req, res) => {
  try {
    const { serviceId, bookingDate, message } = req.body;
    const booking = await createBooking(req.user.userId, serviceId, {
      bookingDate,
      message,
    });
    res.status(200).json({
      success: true,
      message: "Booking Created Successfully",
      booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyBooking = async (req, res) => {
  try {
    const bookings = await getCustomerBookings(req.user.userId);
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getReceivedBookings = async (req, res) => {
  try {
    const bookings = await getProviderBookings(req.user.userId);

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const booking = await updateBookingStatus(
      req.params.id,
      req.user.userId,
      status
    );

    res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
      booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancel = async (req, res) => {
  try {
    const booking = await cancelBooking(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    await deleteCustomerBooking(req.params.id, req.user.userId);
    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeProvider = async (req, res) => {
  try {
    await deleteProviderBooking(req.params.id, req.user.userId);
    res.status(200).json({
      success: true,
      message: "Rejected booking deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
