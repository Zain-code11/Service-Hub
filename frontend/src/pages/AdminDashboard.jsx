import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#fbfcfb] py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Hero Banner */}
        <div className="relative rounded-[36px] bg-gradient-to-br from-[#294539] via-[#335445] to-[#1c3026] text-white p-8 sm:p-12 shadow-2xl overflow-hidden border border-[#3b5d4e]">
          <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-3 backdrop-blur-md">
            Admin Control Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Welcome, {user?.name || "Admin"}</h1>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-2 max-w-xl">
            Manage service categories, monitor platform services, and control user roles and permissions effortlessly.
          </p>
        </div>

        {/* Dashboard Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            to="/admin/categories"
            className="group relative bg-[#f4f7f5] rounded-[32px] border border-[#294539]/20 p-8 shadow-sm transition hover:-translate-y-1.5 hover:border-[#294539] hover:shadow-xl flex flex-col justify-between space-y-6 overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#294539] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                📁
              </div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#294539] transition">
                Categories
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add, edit, or remove service categories to organize platform offerings.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#294539]/15 text-xs font-bold text-[#294539]">
              <span>Manage Categories</span>
              <span>→</span>
            </div>
          </Link>

          <Link
            to="/admin/services"
            className="group relative bg-[#f4f7f5] rounded-[32px] border border-[#294539]/20 p-8 shadow-sm transition hover:-translate-y-1.5 hover:border-[#294539] hover:shadow-xl flex flex-col justify-between space-y-6 overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#294539] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                🛠️
              </div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#294539] transition">
                Services
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Review all platform services listed by providers and manage moderation.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#294539]/15 text-xs font-bold text-[#294539]">
              <span>Manage Services</span>
              <span>→</span>
            </div>
          </Link>

          <Link
            to="/admin/users"
            className="group relative bg-[#f4f7f5] rounded-[32px] border border-[#294539]/20 p-8 shadow-sm transition hover:-translate-y-1.5 hover:border-[#294539] hover:shadow-xl flex flex-col justify-between space-y-6 overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#294539] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                👥
              </div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#294539] transition">
                Users
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Manage registered customers and service providers, update roles.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#294539]/15 text-xs font-bold text-[#294539]">
              <span>Manage Users</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
