import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createService } from "../services/serviceService";
import { getCategories } from "../services/categoryService";

const CreateService = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    serviceType: "remote",
    location: "",
    image: "",
  });

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || data.category || (Array.isArray(data) ? data : []));
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load categories");
      }
    };

    loadCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const serviceData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        serviceType: formData.serviceType,
        location: formData.location,
        image: formData.image,
      };

      await createService(serviceData);
      alert("Service created successfully!");
      navigate("/provider/services");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfcfb] py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto bg-[#f4f7f5] rounded-[28px] border border-[#294539]/20 p-6 sm:p-10 shadow-xl">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#294539] mb-1 block">Provider Portal</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Create Service</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">Add a new professional service with preview that clients can book.</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1">Service Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. House Painting or Web Development"
              className="w-full rounded-xl border border-[#294539]/20 bg-white px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your service scope..."
              rows="3"
              className="w-full rounded-xl border border-[#294539]/20 bg-white px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs resize-none"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1">Service Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/... (optional)"
              className="w-full rounded-xl border border-[#294539]/20 bg-white px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
            />
          </div>

          {/* Grid fields for Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#294539]/20 bg-white px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1">Price (Rs.)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 5000"
                min="0"
                className="w-full rounded-xl border border-[#294539]/20 bg-white px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
                required
              />
            </div>
          </div>

          {/* Grid fields for Service Type & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1">Service Type</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#294539]/20 bg-white px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
              >
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1">Location (if onsite)</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Lahore / Bahawalpur"
                className="w-full rounded-xl border border-[#294539]/20 bg-white px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#294539] hover:bg-[#1c3026] text-white py-3.5 px-4 text-sm font-bold shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-4"
          >
            {loading ? "Creating Service..." : "Create Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateService;
