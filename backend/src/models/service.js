// * Service Schema
import mongoose from "mongoose";
const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
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
      min: 0,
    },
    serviceType: {
      type: String,
      enum: ["remote", "onsite", "both"],
      default: "remote",
    },
    serviceArea: {
      city: {
        type: String,
        trim: true,
      },
      areas: {
        type: [String],
        default: [],
      },
    },
    image: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

const Service = mongoose.model("services", serviceSchema);
export default Service;
