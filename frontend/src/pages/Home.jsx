import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getServices } from "../services/serviceService";
import { getCategories } from "../services/categoryService";
import ServiceCard from "../components/ServiceCard";
import heroImg from "../assets/hero.png";

const Home = () => {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, categoriesRes] = await Promise.all([
          getServices(),
          getCategories(),
        ]);
        setServices(servicesRes.services || servicesRes.service || (Array.isArray(servicesRes) ? servicesRes : []));
        setCategories(categoriesRes.categories || categoriesRes.category || (Array.isArray(categoriesRes) ? categoriesRes : []));
      } catch (error) {
        console.log("Home data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/services?search=${encodeURIComponent(search)}`);
    } else {
      navigate("/services");
    }
  }

  // Professional custom categories WITHOUT images (larger cards with generous spacing & typography)
  const defaultCustomCategories = [
    {
      id: "it-consulting",
      name: "IT Consulting Services",
      description: "Strategic technology guidance tailored to align your infrastructure with long-term business growth, security compliance, and workflow efficiency.",
      icon: "💻",
      badge: "IT & Tech",
    },
    {
      id: "data-analytics",
      name: "Data Analytics Solutions",
      description: "Transform complex raw data into actionable intelligence for smarter forecasting, performance metrics, and business intelligence.",
      icon: "📊",
      badge: "Analytics",
    },
    {
      id: "web-development",
      name: "Website Development",
      description: "Responsive, high-performance web applications and custom software built with modern frameworks for maximum brand impact.",
      icon: "⚡",
      badge: "Development",
    },
  ];

  // Rich fallback mock services if DB is empty so the home page always looks stunning
  const fallbackServices = [
    {
      _id: "mock-1",
      title: "MERN Stack Web Development",
      description: "Professional full-stack MERN web development services with high quality code, scalable architecture, and secure APIs.",
      price: 15000,
      rating: 4.9,
      serviceType: "remote",
      category: { name: "Development" },
      provider: { name: "TechCorp Experts" }
    },
    {
      _id: "mock-2",
      title: "AC Repair & Maintenance",
      description: "Comprehensive air conditioning repair, gas refill, and routine maintenance by verified local technicians.",
      price: 3000,
      rating: 4.8,
      serviceType: "onsite",
      location: "Lahore / Bahawalpur",
      category: { name: "Repair & Maintenance" },
      provider: { name: "CoolAir Services" }
    },
    {
      _id: "mock-3",
      title: "Advanced Data Analytics Dashboard",
      description: "Custom business intelligence dashboards, real-time KPI tracking, and predictive forecasting models.",
      price: 25000,
      rating: 5.0,
      serviceType: "remote",
      category: { name: "Analytics" },
      provider: { name: "DataViz Pro" }
    },
    {
      _id: "mock-4",
      title: "UI/UX Brand Design & Strategy",
      description: "Complete product design systems, user research, wireframing, and high-fidelity interactive prototypes.",
      price: 12000,
      rating: 4.7,
      serviceType: "remote",
      category: { name: "Creative Design" },
      provider: { name: "PixelCraft Studio" }
    },
    {
      _id: "mock-5",
      title: "Enterprise Cloud Security Audit",
      description: "Thorough vulnerability assessment, firewall configuration, and compliance checks for enterprise infrastructure.",
      price: 30000,
      rating: 4.9,
      serviceType: "remote",
      category: { name: "Consulting" },
      provider: { name: "CyberShield Labs" }
    },
    {
      _id: "mock-6",
      title: "Professional Home Deep Cleaning",
      description: "Eco-friendly deep sanitization, upholstery cleaning, and thorough pest control for residential spaces.",
      price: 4500,
      rating: 4.6,
      serviceType: "onsite",
      location: "Islamabad / Rawalpindi",
      category: { name: "Repair & Maintenance" },
      provider: { name: "CleanHome Pros" }
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <div className="min-h-screen bg-[#fbfcfb] flex flex-col font-sans text-slate-900">
      {/* 1. FULL WIDTH EDGE-TO-EDGE HERO SECTION */}
      <section className="w-full pb-12">
        <div className="relative w-full bg-gradient-to-br from-[#294539] via-[#335445] to-[#1c3026] text-white py-12 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-20 shadow-2xl overflow-hidden border-b border-[#3b5d4e]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Bold Editorial Typography */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-200 backdrop-blur-md border border-white/10">
                Trusted Professional IT & Services Marketplace
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08]">
                Drive Growth with <br />
                <span className="text-emerald-300 font-light italic">Scalable, Smart</span> IT Solutions
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl leading-relaxed font-normal">
                From custom software to cloud integration, our expert team delivers reliable IT services that evolve with your business needs.
              </p>

              {/* Search Box */}
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row items-center gap-2 bg-white p-2 rounded-2xl shadow-xl max-w-xl border border-white/20"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 w-full">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search consulting, web development, analytics..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full text-slate-900 placeholder-slate-400 text-sm bg-transparent focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl bg-[#294539] hover:bg-[#1c3026] px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition shrink-0"
                >
                  Explore Services
                </button>
              </form>
            </div>

            {/* Right Column: Hero PNG Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-3">
                <img
                  src={heroImg}
                  alt="ServiceHub Hero Illustration"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LARGER IMAGE-LESS CATEGORIES SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#294539] mb-2 block">Specialized Solutions</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Explore Top Categories</h2>
          </div>
          <Link to="/services" className="mt-4 md:mt-0 text-sm font-bold text-[#294539] hover:underline inline-flex items-center gap-1">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {defaultCustomCategories.map((cat, idx) => (
            <Link
              key={idx}
              to="/services"
              className="group relative bg-[#f4f7f5] rounded-[36px] border border-[#294539]/20 p-10 shadow-sm transition hover:-translate-y-1.5 hover:border-[#294539] hover:shadow-xl flex flex-col justify-between space-y-8 overflow-hidden"
            >
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#294539]/5 rounded-full blur-3xl group-hover:bg-[#294539]/10 transition"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-[#294539] text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-extrabold px-4 py-1.5 rounded-full bg-[#294539]/10 text-[#294539]">
                    {cat.badge}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-[#294539] transition">
                  {cat.name}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  {cat.description}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-6 border-t border-[#294539]/15">
                <span className="text-xs font-bold text-[#294539] uppercase tracking-wider">Explore Category</span>
                <div className="w-11 h-11 rounded-full bg-white group-hover:bg-[#294539] group-hover:text-white flex items-center justify-center text-[#294539] font-bold shadow-sm transition">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. IMAGE + TEXT FEATURE SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-[#f4f7f5] rounded-[36px] p-8 sm:p-14 border border-[#294539]/20 shadow-sm">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#294539] block">About ServiceHub</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Driven by Innovation. Powered by People.
            </h2>
            <p className="text-slate-600 leading-relaxed font-normal text-base">
              With years of hands-on experience in software development, cloud architecture, and enterprise IT services, we empower businesses to adapt to changing technologies.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#294539]/20 text-slate-900 font-semibold text-sm shadow-xs">
                <span>Scalable & Future-Ready</span>
                <span className="text-[#294539]">▾</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#294539]/20 text-slate-900 font-semibold text-sm shadow-xs">
                <span>Client-Centric Approach</span>
                <span className="text-[#294539]">▾</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#294539]/20 text-slate-900 font-semibold text-sm shadow-xs">
                <span>Security & Compliance First</span>
                <span className="text-[#294539]">▾</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-[32px] bg-gradient-to-br from-[#294539] to-[#1c3026] p-8 sm:p-12 text-white shadow-xl flex flex-col justify-between space-y-8 border border-[#3b5d4e]">
            <div>
              <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-4">
                Quality Assurance
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">Built on Trust, Driven by Results</h3>
            </div>
            <p className="text-base text-emerald-100/90 leading-relaxed font-normal">
              Every solution we build is customized to your unique business goals, workflows, and challenges.
            </p>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-emerald-200 font-medium">Verified Expert Network</span>
              <Link to="/services" className="text-sm font-bold text-white hover:underline">Explore Services →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED SERVICES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#294539] mb-2 block">Case Studies & Success Stories</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Featured Services</h2>
          </div>
          <Link to="/services" className="mt-4 md:mt-0 text-sm font-bold text-[#294539] hover:underline inline-flex items-center gap-1">
            Browse all services →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center text-slate-500">
            No services found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* 5. PROVIDER CTA */}
      <section className="bg-[#294539] text-white py-16 px-4 sm:px-6 lg:px-8 my-12 mx-4 sm:mx-6 lg:mx-auto max-w-7xl rounded-[36px] text-center shadow-xl border border-[#3b5d4e]">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 block">Join Our Network</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Have a professional service to offer?</h2>
          <p className="text-emerald-100/90 text-base leading-relaxed font-normal">
            Join ServiceHub as a provider, list your services, receive client bookings, and grow your clientele effortlessly.
          </p>
          <div>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-sm font-semibold text-[#294539] shadow-sm transition hover:bg-emerald-50"
            >
              Become a Provider
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-white text-slate-500 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#294539] text-sm font-bold text-white">
              S
            </div>
            <span className="text-slate-900 font-bold text-base tracking-tight">ServiceHub</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-slate-900 transition">Home</Link>
            <Link to="/services" className="hover:text-slate-900 transition">Services</Link>
            <Link to="/login" className="hover:text-slate-900 transition">Sign In</Link>
            <Link to="/register" className="hover:text-slate-900 transition">Register</Link>
          </div>

          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} ServiceHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
