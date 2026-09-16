import mongoose from "mongoose";
// Booking Schema

const bookingSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
      required: true,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);
const booking = mongoose.model('booking',bookingSchema)
export default booking
