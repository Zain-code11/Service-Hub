import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  // Helper to determine a relevant service icon & theme based on title or category
  const getServiceContext = (title = "", category = "") => {
    const text = `${title} ${category}`.toLowerCase();
    if (text.includes("web") || text.includes("mern") || text.includes("dev") || text.includes("app") || text.includes("code")) {
      return { icon: "💻", label: "Development", gradient: "from-[#294539] via-[#335445] to-slate-950" };
    }
    if (text.includes("repair") || text.includes("ac") || text.includes("plumb") || text.includes("clean") || text.includes("maintenance")) {
      return { icon: "🔧", label: "Repair & Maintenance", gradient: "from-slate-900 via-[#294539] to-emerald-950" };
    }
    if (text.includes("data") || text.includes("analytics") || text.includes("seo") || text.includes("market")) {
      return { icon: "📊", label: "Data & Analytics", gradient: "from-[#1c3026] via-[#294539] to-teal-950" };
    }
    if (text.includes("consult") || text.includes("strategy") || text.includes("business")) {
      return { icon: "📈", label: "Consulting", gradient: "from-slate-950 via-emerald-900 to-[#294539]" };
    }
    if (text.includes("design") || text.includes("ui") || text.includes("ux") || text.includes("logo")) {
      return { icon: "🎨", label: "Creative Design", gradient: "from-[#294539] via-emerald-800 to-slate-950" };
    }
    return { icon: "⚡", label: service.category?.name || "Professional Service", gradient: "from-[#294539] via-[#335445] to-slate-950" };
  };

  const context = getServiceContext(service.title, service.category?.name);

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] bg-white border border-slate-200/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div>
        {/* Top Glassmorphism Header with Service-Relevant Icon & Title */}
        <div className={`relative h-52 w-full overflow-hidden rounded-2xl mb-4 bg-gradient-to-br ${context.gradient} p-6 flex flex-col justify-between shadow-inner`}>
          {/* Ambient blur circles */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top row: Rating & Relevant Category Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white border border-white/20 shadow-sm">
              <span>{context.icon}</span>
              <span>{context.label}</span>
            </span>

            {service.rating > 0 ? (
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/20">
                <span>⭐</span>
                <span>{service.rating}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/20">
                <span>No ratings</span>
              </div>
            )}
          </div>

          {/* Glassmorphism Inner Card with Service Title */}
          <div className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/25 rounded-2xl p-4 shadow-2xl">
            <h4 className="text-lg font-extrabold text-white tracking-tight line-clamp-1">{service.title}</h4>
            <p className="text-xs text-emerald-200 font-medium capitalize mt-0.5">{service.serviceType || "Remote / Onsite"} Service</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-6 px-1">
          {service.description}
        </p>
      </div>

      {/* Bottom Footer Row */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 px-1 mt-auto">
        <div>
          <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Starting from</span>
          <span className="text-lg font-extrabold text-slate-900">
            Rs. {service.price}
          </span>
        </div>

        <Link
          to={`/services/${service._id}`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#294539] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1c3026]"
        >
          <span>Book Now</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
