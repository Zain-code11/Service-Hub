import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getServiceById } from "../services/serviceService";
import ReviewCard from "../components/ReviewCard";
import Pagination from "../components/Pagination";
import { getServiceReviews } from "../services/reviewService";

function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewPage, setReviewPage] = useState(1);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getServiceById(id);
        console.log("Service Details Response:", data);
        setService(data.service);
      } catch (error) {
        console.log("Service Details Error:", error);
        setError(error.response?.data?.message || "Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getServiceReviews(id);
        console.log("Reviews Response:", data);
        setReviews(data.reviews || []);
      } catch (error) {
        console.log("Reviews Error:", error);
      }
    };

    fetchReviews();
  }, [id]);

  const REVIEWS_PER_PAGE = 9;
  const totalReviewPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviews.slice((reviewPage - 1) * REVIEWS_PER_PAGE, reviewPage * REVIEWS_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfcfb] flex items-center justify-center text-slate-500 font-sans">
        Loading service details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fbfcfb] flex items-center justify-center text-red-600 font-sans">
        {error}
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#fbfcfb] flex items-center justify-center text-slate-500 font-sans">
        Service not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfcfb] py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Service Hero Card */}
        <div className="relative rounded-[36px] bg-gradient-to-br from-[#294539] via-[#335445] to-[#1c3026] text-white p-8 sm:p-12 shadow-2xl overflow-hidden border border-[#3b5d4e]">
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-200 backdrop-blur-md border border-white/10">
                {service.category?.name || "Professional Service"}
              </span>
              <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                {service.serviceType}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{service.title}</h1>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {service.description}
            </p>
          </div>
        </div>

        {/* Details & Booking Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 bg-[#f4f7f5] rounded-[32px] border border-[#294539]/20 p-8 shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-[#294539]/15 pb-4">Service Information</h2>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-center justify-between py-2 border-b border-slate-200/80">
                <span className="font-bold text-[#294539]">Provider</span>
                <span className="font-semibold text-slate-900">{service.provider?.name || "Verified Expert"}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-200/80">
                <span className="font-bold text-[#294539]">Category</span>
                <span className="font-semibold text-slate-900">{service.category?.name || "General"}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-200/80">
                <span className="font-bold text-[#294539]">Service Type</span>
                <span className="font-semibold text-slate-900 capitalize">{service.serviceType}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-200/80">
                <span className="font-bold text-[#294539]">Rating</span>
                <span className="font-semibold text-slate-900">
                  {service.rating > 0 ? `⭐ ${service.rating} / 5.0 (${service.reviewCount || 0} reviews)` : "No ratings yet"}
                </span>
              </div>
              {service.serviceType === "onsite" && service.serviceLocation && (
                <div className="flex items-center justify-between py-2 border-b border-slate-200/80">
                  <span className="font-bold text-[#294539]">Location</span>
                  <span className="font-semibold text-slate-900">{service.serviceLocation.city} ({service.serviceLocation.areas?.join(", ")})</span>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-5 bg-[#294539] text-white rounded-[32px] p-8 shadow-xl space-y-6 border border-[#3b5d4e]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 block mb-1">Pricing & Booking</span>
              <div className="text-4xl font-black text-white">
                Rs. {service.price?.toLocaleString()}
              </div>
            </div>

            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Book this professional service now to schedule a consultation or appointment with the expert provider.
            </p>

            <Link
              to={`/services/${service._id}/book`}
              className="w-full flex items-center justify-center rounded-2xl bg-white hover:bg-emerald-50 text-[#294539] py-4 px-6 text-sm font-bold shadow-lg transition duration-200"
            >
              Book This Service
            </Link>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-8 pt-6 border-t border-slate-200/80">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#294539] mb-1 block">Client Feedback</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Reviews & Ratings</h2>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-[#f4f7f5] rounded-[28px] border border-[#294539]/20 p-8 text-center text-slate-500 text-sm">
              No reviews yet for this service.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedReviews.map((review) => (
                  <div key={review._id} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
              <Pagination
                currentPage={reviewPage}
                totalPages={totalReviewPages}
                onPageChange={setReviewPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
