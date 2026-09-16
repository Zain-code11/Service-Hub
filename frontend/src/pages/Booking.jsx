import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking } from "../services/bookingService";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    message: "",
    bookingDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");
      setIsError(false);
      const bookingData = {
        serviceId: id,
        message: formData.message,
        bookingDate: formData.bookingDate,
      };
      await createBooking(bookingData);
      setMessage("Booking created successfully! Redirecting...");
      setIsError(false);
      setTimeout(() => {
        navigate("/my-bookings");
      }, 1200);
    } catch (error) {
      console.log("Booking Error:", error);
      setIsError(true);
      setMessage(error.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfcfb] py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-xl mx-auto bg-[#f4f7f5] rounded-[32px] border border-[#294539]/20 p-8 sm:p-12 shadow-xl">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#294539] mb-1 block">Client Portal</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Book Service</h1>
          <p className="text-sm text-slate-600 mt-1">Provide your requirements and preferred appointment date.</p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs font-semibold border ${
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
              Requirements / Message
            </label>
            <textarea
              name="message"
              placeholder="Tell the provider what you need..."
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#294539]/20 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-2">
              Booking Date
            </label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#294539]/20 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#294539] hover:bg-[#1c3026] text-white py-4 px-6 text-sm font-bold shadow-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {loading ? "Confirming Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
