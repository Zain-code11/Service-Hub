import { useState } from "react";
import { createReview } from "../services/reviewService";

const ReviewForm = ({ serviceId, bookingId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setIsError(false);

      const reviewData = {
        serviceId,
        bookingId,
        rating,
        comment,
      };

      await createReview(reviewData);
      window.alert("Review added successfully!");
      setComment("");
      setRating(5);

      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (error) {
      console.log("Review Error:", error);
      setIsError(true);
      setMessage(error.response?.data?.message || "Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900">Leave a Review</h3>

      {message && (
        <div
          className={`p-3 rounded-xl text-xs font-semibold border ${
            isError
              ? "bg-red-50 text-red-700 border-red-200"
              : "bg-emerald-50 text-emerald-800 border-emerald-200"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1.5">
            Rating
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#294539]/20 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5/5 - Excellent)</option>
            <option value={4}>⭐⭐⭐⭐ (4/5 - Very Good)</option>
            <option value={3}>⭐⭐⭐ (3/5 - Good)</option>
            <option value={2}>⭐⭐ (2/5 - Fair)</option>
            <option value={1}>⭐ (1/5 - Poor)</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1.5">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this service..."
            rows="3"
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#294539]/20 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#294539] hover:bg-[#1c3026] text-white py-3 px-4 text-xs font-bold shadow-md transition cursor-pointer disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
