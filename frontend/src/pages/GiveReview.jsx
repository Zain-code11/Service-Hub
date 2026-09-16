import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getServiceById } from "../services/serviceService";
import { createReview, updateReview, getReviewByBooking } from "../services/reviewService";

const GiveReview = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [existingReviewId, setExistingReviewId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceData, reviewData] = await Promise.all([
          getServiceById(id),
          bookingId ? getReviewByBooking(bookingId).catch(() => null) : null,
        ]);
        setService(serviceData.service);
        if (reviewData && reviewData.review) {
          setExistingReviewId(reviewData.review._id);
          setRating(reviewData.review.rating || 5);
          setComment(reviewData.review.comment || "");
          setIsEditing(true);
        }
      } catch (error) {
        console.log("Error loading review data:", error);
        setIsError(true);
        setMessage("Failed to load details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId) {
      setIsError(true);
      setMessage("Missing booking reference for this review.");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");
      setIsError(false);

      if (isEditing && existingReviewId) {
        await updateReview(existingReviewId, {
          rating,
          comment,
        });
        window.alert("Review updated successfully!");
      } else {
        await createReview({
          serviceId: id,
          bookingId,
          rating,
          comment,
        });
        window.alert("Review submitted successfully!");
      }

      navigate(`/services/${id}`);
    } catch (error) {
      console.log("Review Error:", error);
      setIsError(true);
      setMessage(error.response?.data?.message || "Failed to save review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfcfb] flex items-center justify-center text-slate-500 font-sans">
        Loading review form...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfcfb] py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-xl mx-auto bg-[#f4f7f5] rounded-[32px] border border-[#294539]/20 p-8 sm:p-12 shadow-xl space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#294539] mb-1 block">Client Feedback</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {isEditing ? "Edit Review" : "Give Review"}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Reviewing provider <span className="font-semibold text-[#294539]">{service?.provider?.name || "Expert"}</span> for <span className="font-semibold text-slate-900">{service?.title}</span>
          </p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold border ${
              isError
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-2">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#294539]/20 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5/5 - Excellent)</option>
              <option value={4}>⭐⭐⭐⭐ (4/5 - Very Good)</option>
              <option value={3}>⭐⭐⭐ (3/5 - Good)</option>
              <option value={2}>⭐⭐ (2/5 - Fair)</option>
              <option value={1}>⭐ (1/5 - Poor)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-2">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your detailed experience with this service provider..."
              rows="4"
              required
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#294539]/20 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-1/3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 py-4 px-6 text-sm font-bold transition duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="w-2/3 rounded-2xl bg-[#294539] hover:bg-[#1c3026] text-white py-4 px-6 text-sm font-bold shadow-lg transition duration-200 cursor-pointer disabled:opacity-70"
            >
              {submitting ? "Saving..." : isEditing ? "Update Review" : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveReview;
