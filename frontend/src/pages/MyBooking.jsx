import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyBooking, cancelBooking, deleteBooking } from "../services/bookingService";
import { getMyReviews } from "../services/reviewService";
import Pagination from "../components/Pagination";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [reviewedBookingIds, setReviewedBookingIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingData, reviewData] = await Promise.all([
          getMyBooking(),
          getMyReviews().catch(() => ({ reviews: [] })),
        ]);
        setBookings(bookingData?.bookings || []);
        const reviewedIds = new Set(
          (reviewData?.reviews || []).map((r) => (r.booking?._id || r.booking).toString())
        );
        setReviewedBookingIds(reviewedIds);
      } catch (error) {
        console.log("My Bookings Error:", error);
        setError(error?.response?.data?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      setActionId(bookingId);
      await cancelBooking(bookingId);
      const data = await getMyBooking();
      setBookings(data?.bookings || []);
      window.alert("Booking cancelled successfully!");
    } catch (error) {
      console.log("Cancel Booking Error:", error);
      setError(error?.response?.data?.message || "Failed to cancel booking");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to permanently delete this cancelled booking?")) return;
    try {
      setActionId(bookingId);
      await deleteBooking(bookingId);
      const data = await getMyBooking();
      setBookings(data?.bookings || []);
      window.alert("Cancelled booking deleted successfully!");
    } catch (error) {
      console.log("Delete Booking Error:", error);
      setError(error?.response?.data?.message || "Failed to delete booking");
    } finally {
      setActionId(null);
    }
  };

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = bookings.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfcfb] flex items-center justify-center text-slate-500 font-sans">
        Loading bookings...
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

  return (
    <div className="min-h-screen bg-[#fbfcfb] py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#294539] mb-1 block">Client Portal</span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Bookings</h1>
            <p className="text-sm text-slate-600 mt-1">Track and manage your service bookings and appointments.</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-[#f4f7f5] rounded-[28px] border border-[#294539]/20 p-12 text-center text-slate-500 text-sm">
            You have no bookings yet.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedBookings.map((booking) => {
                const hasReviewed = reviewedBookingIds.has(booking._id.toString());
                return (
                  <div
                    key={booking._id}
                    className="bg-[#f4f7f5] rounded-[28px] border border-[#294539]/20 p-6 shadow-sm flex flex-col justify-between space-y-6 transition hover:border-[#294539] hover:shadow-md"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#294539]/10 text-[#294539] uppercase tracking-wider">
                          {booking.status === "pending"
                            ? "In Progress"
                            : booking.status === "accepted"
                            ? "Accepted — On Working..."
                            : booking.status}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900">{booking.service?.title || "Service"}</h3>
                      <div className="space-y-1">
                        <p className="text-sm text-slate-600 font-medium">Provider: {booking.provider?.name || "Provider"}</p>
                        {booking.provider?.phone && (
                          <p className="text-xs font-bold text-[#294539] flex items-center gap-1">
                            <span>📞</span> Phone: <a href={`tel:${booking.provider.phone}`} className="underline hover:text-emerald-700">{booking.provider.phone}</a>
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200/80">
                        "{booking.message}"
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-[#294539]/15">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                        <span>Price:</span>
                        <span className="text-base font-black text-[#294539]">Rs. {booking.service?.price?.toLocaleString()}</span>
                      </div>

                      {booking.status === "pending" && (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          disabled={actionId === booking._id}
                          className="w-full py-2.5 px-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white text-xs font-bold transition shadow-xs disabled:opacity-70 cursor-pointer"
                        >
                          {actionId === booking._id ? "Cancelling..." : "Cancel Booking"}
                        </button>
                      )}

                      {booking.status === "completed" && booking.service?._id && (
                        <Link
                          to={`/services/${booking.service._id}/review?bookingId=${booking._id}`}
                          className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#294539] hover:bg-[#1c3026] text-white text-xs font-bold transition shadow-xs"
                        >
                          {hasReviewed ? "Edit Review ✏️" : "Give Review ⭐"}
                        </Link>
                      )}

                      {booking.status === "cancelled" && (
                        <button
                          onClick={() => handleDelete(booking._id)}
                          disabled={actionId === booking._id}
                          className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-xs disabled:opacity-70 cursor-pointer"
                        >
                          {actionId === booking._id ? "Deleting..." : "Delete Cancelled Booking"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
