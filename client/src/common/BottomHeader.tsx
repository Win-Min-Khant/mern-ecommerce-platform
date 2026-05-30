import { Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";

const categories = ["Apparel", "Electronics", "Photography", "Home"];

function BottomHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search); // products/filter
  const activeCategory = searchParams.get("category") || "";

  const handleClick = (category: string) => {
    const params = new URLSearchParams(location.search); // products/filter

    // Toggle Logic
    if (activeCategory === category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    navigate(`/products/filter?${params.toString()}`);
  };

  return (
    <div className="bg-[#F3F4F6] text-black border-b border-gray-200">
      <div className="max-w-7xl mx-auto w-full px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left Side: Menu & Brand */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <Menu
              size={20}
              className="group-hover:text-gray-600 transition-colors"
            />
            <Link
              to={"/products/filter"}
              className="text-sm font-bold tracking-tight"
            >
              SHOP ALL
            </Link>
          </div>

          {/* Desktop categories */}
          <div className="hidden md:flex flex-wrap items-center gap-6">
            {categories.map((cat, index) => {
              const isActive = activeCategory === cat;
              return (
                <div
                  key={index}
                  onClick={() => handleClick(cat)}
                  className="relative cursor-pointer py-1"
                >
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-black" : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {cat}
                  </p>

                  {/* Active Indicator: Clean Bottom Line */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: horizontal scroll categories */}
        <div className="mt-3 w-full overflow-x-auto pb-2 md:hidden">
          <div className="flex gap-3 min-w-max px-2">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={idx}
                  onClick={() => handleClick(cat)}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-600 bg-white/0 hover:bg-white/50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomHeader;
