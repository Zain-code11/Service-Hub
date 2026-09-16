import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole, deleteUser } from "../services/userService";
import Pagination from "../components/Pagination";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllUsers();
      setUsers(data.users || data.user || (Array.isArray(data) ? data : []));
    } catch (error) {
      console.log("Users Error:", error);
      setError(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setError("");
      setMessage("");
      await updateUserRole(userId, newRole);
      setMessage("User role updated successfully!");
      fetchUsers();
    } catch (error) {
      console.log("Update Role Error:", error);
      setError(error.response?.data?.message || "Failed to update user role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setError("");
      setMessage("");
      await deleteUser(userId);
      setMessage("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.log("Delete User Error:", error);
      setError(error.response?.data?.message || "Failed to delete user");
    }
  };

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfcfb] flex items-center justify-center text-slate-500 font-sans">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfcfb] py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#294539] mb-1 block">Admin Management</span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Platform Users</h1>
          </div>
        </div>

        {message && <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">{message}</div>}
        {error && <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">{error}</div>}

        {users.length === 0 ? (
          <div className="bg-[#f4f7f5] rounded-[28px] border border-[#294539]/20 p-12 text-center text-slate-500 text-sm">
            No users found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedUsers.map((user) => (
                <div
                  key={user._id}
                  className="bg-[#f4f7f5] rounded-[28px] border border-[#294539]/20 p-6 shadow-sm flex flex-col justify-between space-y-6 transition hover:border-[#294539] hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#294539] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{user.name}</h3>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                      <p>Phone: <strong className="text-slate-900">{user.phone || "Not provided"}</strong></p>
                      <p>Joined: <strong className="text-slate-900">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</strong></p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[#294539]/15">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#294539]">Role</span>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="px-3 py-1.5 rounded-xl border border-[#294539]/20 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:border-[#294539] cursor-pointer"
                      >
                        <option value="customer">Customer</option>
                        <option value="provider">Provider</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      Delete User
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

export default AdminUsers;
