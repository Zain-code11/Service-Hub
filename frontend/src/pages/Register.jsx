import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });
  const [showPassword, setShowPassword] = useState(false);
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
    setLoading(true);
    setMessage("");
    setIsError(false);
    try {
      await registerUser(formData);
      setMessage("Account created successfully! Redirecting...");
      setIsError(false);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log("register Error:", error);
      setIsError(true);
      setMessage(error.response?.data?.message || "Registration failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#fbfcfb] flex flex-col justify-center items-center py-4 px-4 font-sans text-slate-900">
      <div className="w-full max-w-md bg-[#f4f7f5] rounded-3xl border border-[#294539]/20 p-6 sm:p-8 shadow-xl">
        <div className="text-center mb-5">
          <Link to="/" className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-[#294539] text-white font-bold text-lg mb-2 shadow-md">
            S
          </Link>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Create Account</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Join ServiceHub as a client or provider
          </p>
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded-xl text-xs font-semibold border ${
              isError
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#294539]/20 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#294539]/20 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+92 300 1234567"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#294539]/20 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 pr-14 rounded-xl bg-white border border-[#294539]/20 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#294539] transition shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#294539] hover:underline cursor-pointer px-2 py-1"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "customer" })}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center cursor-pointer ${
                  formData.role === "customer"
                    ? "bg-[#294539] text-white border-[#294539] shadow-sm"
                    : "bg-white text-slate-700 border-[#294539]/20 hover:bg-slate-50"
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "provider" })}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center cursor-pointer ${
                  formData.role === "provider"
                    ? "bg-[#294539] text-white border-[#294539] shadow-sm"
                    : "bg-white text-slate-700 border-[#294539]/20 hover:bg-slate-50"
                }`}
              >
                Provider
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#294539] hover:bg-[#1c3026] text-white py-3 px-4 text-sm font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-1"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="mt-5 pt-3 border-t border-[#294539]/15 text-center">
          <p className="text-xs sm:text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-[#294539] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
