import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'services',
      required: true
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bookings',
      required: true
    },
    rating: {
      type: Number,
      trim: true,
      default: ''
    },
    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
)
const Reviews = mongoose.model('reviews',reviewSchema)
export default Reviews