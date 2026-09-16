import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    logout();
    closeMenu();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive ? "text-[#294539]" : "text-slate-600 hover:text-[#294539]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#294539] text-sm font-bold text-white shadow-md transition-transform group-hover:scale-105">
            S
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            ServiceHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/services" className={navLinkClass}>
            Services
          </NavLink>

          {/* Customer links */}
          {user?.role === "customer" && (
            <NavLink to="/my-bookings" className={navLinkClass}>
              My Bookings
            </NavLink>
          )}

          {/* Provider links */}
          {user?.role === "provider" && (
            <>
              <NavLink to="/provider/services" className={navLinkClass}>
                My Services
              </NavLink>
              <NavLink to="/provider/services/create" className={navLinkClass}>
                Create Service
              </NavLink>
              <NavLink to="/provider/bookings" className={navLinkClass}>
                Bookings
              </NavLink>
            </>
          )}

          {/* Admin links */}
          {user?.role === "admin" && (
            <>
              <NavLink to="/admin" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/admin/categories" className={navLinkClass}>
                Categories
              </NavLink>
              <NavLink to="/admin/services" className={navLinkClass}>
                Services
              </NavLink>
              <NavLink to="/admin/users" className={navLinkClass}>
                Users
              </NavLink>
            </>
          )}
        </nav>

        {/* Desktop Auth / User Area */}
        <div className="hidden items-center gap-4 md:flex">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 transition hover:text-[#294539] px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-[#294539] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#1c3026]"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#294539]/10 text-sm font-bold text-[#294539] border border-[#294539]/20">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-slate-900">{user.name}</p>
                  <p className="text-xs capitalize text-slate-500 font-medium">{user.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div className="border-t border-slate-200/80 bg-white md:hidden shadow-xl">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-6 space-y-2">
            <NavLink to="/" onClick={closeMenu} className={navLinkClass}>
              <span className="block rounded-xl px-4 py-3 hover:bg-slate-50">Home</span>
            </NavLink>
            <NavLink to="/services" onClick={closeMenu} className={navLinkClass}>
              <span className="block rounded-xl px-4 py-3 hover:bg-slate-50">Services</span>
            </NavLink>

            {user?.role === "customer" && (
              <NavLink to="/my-bookings" onClick={closeMenu} className={navLinkClass}>
                <span className="block rounded-xl px-4 py-3 hover:bg-slate-50">My Bookings</span>
              </NavLink>
            )}

            {user?.role === "provider" && (
              <>
                <NavLink to="/provider/services" onClick={closeMenu} className={navLinkClass}>
                  <span className="block rounded-xl px-4 py-3 hover:bg-slate-50">My Services</span>
                </NavLink>
                <NavLink to="/provider/services/create" onClick={closeMenu} className={navLinkClass}>
                  <span className="block rounded-xl px-4 py-3 hover:bg-slate-50">Create Service</span>
                </NavLink>
                <NavLink to="/provider/bookings" onClick={closeMenu} className={navLinkClass}>
                  <span className="block rounded-xl px-4 py-3 hover:bg-slate-50">Bookings</span>
                </NavLink>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <NavLink to="/admin" onClick={closeMenu} className={navLinkClass}>
                  <span className="block rounded-xl px-4 py-3 hover:bg-slate-50">Dashboard</span>
                </NavLink>
                <NavLink to="/admin/categories" onClick={closeMenu} className={navLinkClass}>
                  <span className="block rounded-xl px-4 py-3 hover:bg-slate-50">Categories</span>
                </NavLink>
                <NavLink to="/admin/services" onClick={closeMenu} className={navLinkClass}>
                  <span className="block rounded-xl px-4 py-3 hover:bg-slate-50">Services</span>
                </NavLink>
                <NavLink to="/admin/users" onClick={closeMenu} className={navLinkClass}>
                  <span className="block rounded-xl px-4 py-3 hover:bg-slate-50">Users</span>
                </NavLink>
              </>
            )}

            <div className="pt-4 mt-2 border-t border-slate-200">
              {!user ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 border border-slate-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="rounded-full bg-[#294539] px-4 py-3 text-center text-sm font-bold text-white shadow-sm hover:bg-[#1c3026]"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 border border-slate-200">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#294539]/10 font-bold text-[#294539]">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs capitalize text-slate-500 font-medium">{user.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
