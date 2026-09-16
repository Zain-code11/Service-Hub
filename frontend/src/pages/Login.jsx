import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const data = await loginUser(formData);
      localStorage.setItem("token", data.user.token);
      login(data.user.user);
      setMessage("Login successful! Redirecting...");
      setIsError(false);
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      console.log("Login Error:", error);
      setIsError(true);
      setMessage(error.response?.data?.message || "Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#fbfcfb] flex flex-col justify-center items-center py-4 px-4 font-sans text-slate-900">
      <div className="w-full max-w-md bg-[#f4f7f5] rounded-3xl border border-[#294539]/20 p-6 sm:p-8 shadow-xl">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-[#294539] text-white font-bold text-lg mb-3 shadow-md">
            S
          </Link>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Sign in to your ServiceHub account
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1.5">
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
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#294539] mb-1.5">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#294539] hover:bg-[#1c3026] text-white py-3 px-4 text-sm font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#294539]/15 text-center">
          <p className="text-xs sm:text-sm text-slate-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-[#294539] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
