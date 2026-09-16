import ServiceCard from "../components/ServiceCard";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getServices } from "../services/serviceService";
import { getCategories } from "../services/categoryService";

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

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
        console.log("Services Error: ", error);
        setError(error.response?.data?.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryQuery]);

  // Filter services based on search query or category
  const filteredServices = services.filter((service) => {
    const matchesSearch = searchQuery
      ? service.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = categoryQuery
      ? service.category?._id === categoryQuery || service.category === categoryQuery
      : true;

    return matchesSearch && matchesCategory;
  });

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const paginatedServices = filteredServices.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center text-slate-500">
        Loading Services...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-slate-900 pb-20">
      {/* Header Banner */}
      <div className="bg-white border-b border-slate-200/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">Catalog</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">Available Services</h1>
          <p className="text-slate-600 max-w-2xl text-base">
            Discover trusted professionals, compare service packages, and book the right expert for your project.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.delete("category");
                setSearchParams(newParams);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                !categoryQuery
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.set("category", cat._id);
                  setSearchParams(newParams);
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                  categoryQuery === cat._id
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing results for &ldquo;<span className="font-semibold text-slate-900">{searchQuery}</span>&rdquo;
            </p>
            <button
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.delete("search");
                setSearchParams(newParams);
              }}
              className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}

        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl font-bold">∅</div>
            <h3 className="text-xl font-bold text-slate-900">No services found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any services matching your filters. Try browsing another category or clearing search.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setSearchParams({})}
                className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedServices.map((service, index) => (
                <ServiceCard key={service._id} service={service} index={index} />
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

export default Services;
