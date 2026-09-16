import { useEffect, useState } from "react";
import { getAllServices, deleteService } from "../services/adminServices";
import Pagination from "../components/Pagination";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllServices();
      setServices(data.services || []);
    } catch (error) {
      console.log("Admin Services Error:", error);
      setError(error.response?.data?.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      setError("");
      setMessage("");
      await deleteService(id);
      setMessage("Service deleted successfully!");
      await fetchServices();
    } catch (error) {
      console.log("Delete Service Error:", error);
      setError(error.response?.data?.message || "Failed to delete service");
    }
  };

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
  const paginatedServices = services.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfcfb] flex items-center justify-center text-slate-500 font-sans">
        Loading services...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfcfb] py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#294539] mb-1 block">Admin Management</span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage All Platform Services</h1>
          </div>
        </div>

        {message && <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">{message}</div>}
        {error && <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">{error}</div>}

        {services.length === 0 ? (
          <div className="bg-[#f4f7f5] rounded-[28px] border border-[#294539]/20 p-12 text-center text-slate-500 text-sm">
            No services found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedServices.map((service) => (
                <div
                  key={service._id}
                  className="bg-[#f4f7f5] rounded-[28px] border border-[#294539]/20 p-6 shadow-sm flex flex-col justify-between space-y-6 transition hover:border-[#294539] hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#294539]/10 text-[#294539] uppercase tracking-wider">
                        {service.category?.name || "General"}
                      </span>
                      <span className="text-xs font-bold text-slate-500 capitalize">
                        {service.serviceType}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{service.description}</p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[#294539]/15">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                      <span>Provider: <strong className="text-slate-900">{service.provider?.name || "Unknown"}</strong></span>
                      <span className="text-base font-black text-[#294539]">Rs. {service.price?.toLocaleString()}</span>
                    </div>

                    <button
                      onClick={() => handleDelete(service._id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      Delete Service
                    </button>
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

export default AdminServices;
