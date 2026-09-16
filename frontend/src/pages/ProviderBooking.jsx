import { useEffect, useState } from "react";
import { getReceiveBooking, updateBookingStatus, deleteProviderBooking } from "../services/bookingService";
import Pagination from "../components/Pagination";

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getReceiveBooking();
        console.log("Received Bookings:", data);
        setBookings(data.bookings || []);
      } catch (error) {
        console.log("Received Bookings Error:", error);
        setError(error.response?.data?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, status) => {
    const actionLabel = status === "accepted" ? "accept" : status === "rejected" ? "reject" : "mark as completed";
    if (!window.confirm(`Are you sure you want to ${actionLabel} this booking?`)) return;
    try {
      setActionLoadingId(bookingId);
      await updateBookingStatus(bookingId, status);
      setBookings(
        bookings.map((b) => (b._id === bookingId ? { ...b, status } : b))
      );
      window.alert(`Booking ${status} successfully!`);
    } catch (error) {
      console.log("Update Booking Status Error:", error);
      alert(error.response?.data?.message || "Failed to update booking status");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to permanently delete this rejected booking?")) return;
    try {
      setActionLoadingId(bookingId);
      await deleteProviderBooking(bookingId);
      setBookings(bookings.filter((b) => b._id !== bookingId));
      window.alert("Rejected booking deleted successfully!");
    } catch (error) {
      console.log("Delete Booking Error:", error);
      alert(error.response?.data?.message || "Failed to delete booking");
    } finally {
      setActionLoadingId(null);
    }
  };

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = bookings.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfcfb] flex items-center justify-center text-slate-500 font-sans">
        Loading received bookings...
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#294539] mb-1 block">Provider Portal</span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Received Bookings</h1>
            <p className="text-sm text-slate-600 mt-1">Review and manage appointment requests from clients.</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-[#f4f7f5] rounded-[28px] border border-[#294539]/20 p-12 text-center text-slate-500 text-sm">
            No bookings received yet.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-[#f4f7f5] rounded-[28px] border border-[#294539]/20 p-6 shadow-sm flex flex-col justify-between space-y-6 transition hover:border-[#294539] hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#294539]/10 text-[#294539] uppercase tracking-wider">
                        {booking.status}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">{booking.service?.title || "Service"}</h3>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-600 font-medium">Client: {booking.customer?.name || "Customer"}</p>
                      {booking.customer?.phone && (
                        <p className="text-xs font-bold text-[#294539] flex items-center gap-1">
                          <span>📞</span> Phone: <a href={`tel:${booking.customer.phone}`} className="underline hover:text-emerald-700">{booking.customer.phone}</a>
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
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleStatusUpdate(booking._id, "accepted")}
                          disabled={actionLoadingId === booking._id}
                          className="py-2.5 px-3 rounded-xl bg-[#294539] hover:bg-[#1c3026] text-white text-xs font-bold transition shadow-xs disabled:opacity-70 cursor-pointer"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking._id, "rejected")}
                          disabled={actionLoadingId === booking._id}
                          className="py-2.5 px-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white text-xs font-bold transition shadow-xs disabled:opacity-70 cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {booking.status === "accepted" && (
                      <button
                        onClick={() => handleStatusUpdate(booking._id, "completed")}
                        disabled={actionLoadingId === booking._id}
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs disabled:opacity-70 cursor-pointer"
                      >
                        {actionLoadingId === booking._id ? "Processing..." : "Mark as Completed"}
                      </button>
                    )}

                    {booking.status === "rejected" && (
                      <button
                        onClick={() => handleDelete(booking._id)}
                        disabled={actionLoadingId === booking._id}
                        className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-xs disabled:opacity-70 cursor-pointer"
                      >
                        {actionLoadingId === booking._id ? "Deleting..." : "Delete Rejected Booking"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
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

export default ProviderBookings;
