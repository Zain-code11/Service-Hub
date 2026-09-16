import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCategories();
      setCategories(data.category || data.categories || []);
    } catch (error) {
      console.log("Categories Error:", error);
      setError(error.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      setMessage("");

      const categoryData = { name, description };

      if (editingId) {
        await updateCategory(editingId, categoryData);
        setMessage("Category updated successfully!");
      } else {
        await createCategory(categoryData);
        setMessage("Category created successfully!");
      }

      resetForm();
      await fetchCategories();
    } catch (error) {
      console.log("Category Save Error:", error);
      setError(error.response?.data?.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setName(category.name);
    setDescription(category.description || "");
    setMessage("");
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      setError("");
      setMessage("");
      await deleteCategory(id);
      setMessage("Category deleted successfully!");
      await fetchCategories();
    } catch (error) {
      console.log("Category Delete Error:", error);
      setError(error.response?.data?.message || "Failed to delete category");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfcfb] flex items-center justify-center text-slate-500 font-sans">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfcfb] py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#294539] mb-1 block">Admin Management</span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Categories</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Card */}
          <div className="lg:col-span-5 bg-[#f4f7f5] rounded-[32px] border border-[#294539]/20 p-8 shadow-xl h-fit">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {editingId ? "Edit Category" : "Create New Category"}
            </h2>

            {message && <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">{message}</div>}
            {error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1.5">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. IT & Software"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#294539]/20 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1.5">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Category description..."
                  rows="3"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#294539]/20 text-slate-900 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-[#294539] hover:bg-[#1c3026] text-white py-3 px-4 text-xs font-bold shadow-md transition cursor-pointer disabled:opacity-70"
                >
                  {saving ? "Saving..." : editingId ? "Update Category" : "Create Category"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-slate-300 bg-white py-3 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Categories Grid List */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">All Categories ({categories.length})</h2>

            {categories.length === 0 ? (
              <div className="bg-[#f4f7f5] rounded-[28px] border border-[#294539]/20 p-12 text-center text-slate-500 text-sm">
                No categories found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex items-center justify-between gap-4 transition hover:border-[#294539]/40"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900">{category.name}</h3>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed">
                        {category.description || "No description provided."}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEdit(category)}
                        className="px-3.5 py-2 rounded-xl bg-[#294539]/10 text-[#294539] text-xs font-bold hover:bg-[#294539] hover:text-white transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="px-3.5 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-600 hover:text-white transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
