import { useLocation, useNavigate } from "react-router";
import ProductCard from "@/components/products/ProductCard";
import {
  useGetProductsMetaQuery,
  useGetProductsQuery,
} from "@/store/slices/productApiSlice";
import type { FilteredProduct, Product } from "@/types/product";
import { useEffect, useState } from "react";

function ProductFilter() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. URL Parameters မှ တစ်ဆင့် Initial State ကို ဖတ်ယူခြင်း
  const initialFilter = (): FilteredProduct => {
    const searchParams = new URLSearchParams(location.search);
    return {
      keyword: searchParams.get("keyword") || "",
      category: searchParams.get("category") || "",
      colors: searchParams.getAll("color"),
      sizes: searchParams.getAll("size"),
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    };
  };

  // Local State သတ်မှတ်ခြင်း
  const [filter, setFilter] = useState<FilteredProduct>(initialFilter);

  // 2. URL Change ဖြစ်တိုင်း Local State ကို လိုက်ပြောင်းပေးခြင်း (Back/Forward Button အတွက်ပါ အလုပ်လုပ်စေရန်)
  useEffect(() => {
    setFilter(initialFilter());
  }, [location.search]);

  // 3. Sync URL: Local State ပြောင်းလဲမှုများကို URL Query String သို့ ပြောင်းလဲတွန်းပို့ခြင်း
  useEffect(() => {
    const params = new URLSearchParams();
    if (filter.keyword) params.set("keyword", filter.keyword);
    if (filter.category) params.set("category", filter.category);
    if (filter.minPrice) params.set("minPrice", filter.minPrice);
    if (filter.maxPrice) params.set("maxPrice", filter.maxPrice);

    if (filter.sizes && filter.sizes.length > 0) {
      filter.sizes.forEach((size) => params.append("size", size));
    }
    if (filter.colors && filter.colors.length > 0) {
      filter.colors.forEach((color) => params.append("color", color));
    }

    const newSearchQuery = params.toString();
    const currentSearchQuery = location.search.slice(1);

    // အကယ်၍ URL အဟောင်းနှင့် အသစ်မတူမှသာ Navigate လုပ်မည် (Infinite Loop မဖြစ်အောင် ကာကွယ်ခြင်း)
    if (newSearchQuery !== currentSearchQuery) {
      const timeoutId = setTimeout(() => {
        navigate(
          {
            pathname: "/products/filter",
            search: newSearchQuery ? `?${newSearchQuery}` : "",
          },
          { replace: true },
        );
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [filter, location.search, navigate]);

  // RTK Query ဖြင့် Data Fetch လုပ်ခြင်း
  const {
    data: products = [],
    isFetching,
    isLoading,
  } = useGetProductsQuery(filter);
  const { data: meta_products } = useGetProductsMetaQuery("none");

  // 4. Multiple Badge/Checkbox Selection ကို Handle လုပ်မည့် Function
  const handleFilter = (key: "sizes" | "colors", value: string) => {
    setFilter((prev) => {
      const currentValues = prev[key] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value) // ရှိပြီးသားဆိုရင် ဖယ်ထုတ်မယ်
        : [...currentValues, value]; // မရှိသေးရင် အသစ်ထည့်မယ်

      return {
        ...prev,
        [key]: newValues,
      };
    });
  };

  // Input Field (Min/Max Price) များ Blur ဖြစ်သွားချိန်တွင် State အား Update လုပ်ခြင်း
  const handlePriceBlur = (key: "minPrice" | "maxPrice", value: string) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (isLoading)
    return (
      <div className="h-[60vh] flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto my-16 px-6 bg-white text-black font-sans">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-4xl font-light tracking-tight text-black mb-2 uppercase">
          {filter.category || "Collections"}
        </h1>
        <p className="text-gray-400 text-sm tracking-widest uppercase">
          {products.length} Products{" "}
          {filter.keyword && `matching "${filter.keyword}"`}
        </p>
      </div>

      <div className="grid grid-cols-12 gap-12">
        {/* --- Sidebar: Filters --- */}
        <aside className="col-span-12 lg:col-span-3 space-y-12">
          {/* Size Filter */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-black">
              Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {meta_products?.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => handleFilter("sizes", s)}
                  className={`px-4 py-2 text-[10px] border transition-all duration-300 ${
                    filter.sizes.includes(s)
                      ? "bg-black text-white border-black"
                      : "border-gray-200 text-gray-500 hover:border-black hover:text-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-black">
              Color
            </h3>
            <div className="flex flex-wrap gap-4">
              {meta_products?.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => handleFilter("colors", c)}
                  className={`w-6 h-6 rounded-full border border-gray-200 transition-transform hover:scale-110 ${
                    filter.colors.includes(c)
                      ? "ring-1 ring-black ring-offset-4"
                      : ""
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-black">
              Price
            </h3>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Min Price"
                className="w-full bg-transparent border-b border-gray-200 py-2 text-xs focus:border-black outline-none transition-colors"
                onBlur={(e) => handlePriceBlur("minPrice", e.target.value)}
                defaultValue={filter.minPrice}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="w-full bg-transparent border-b border-gray-200 py-2 text-xs focus:border-black outline-none transition-colors"
                onBlur={(e) => handlePriceBlur("maxPrice", e.target.value)}
                defaultValue={filter.maxPrice}
              />
            </div>
          </div>

          {/* Reset Button */}
          {(filter.colors.length > 0 ||
            filter.sizes.length > 0 ||
            filter.minPrice ||
            filter.maxPrice ||
            filter.keyword ||
            filter.category) && (
            <button
              onClick={() => navigate(location.pathname)}
              className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors block pt-2"
            >
              Reset Filters
            </button>
          )}
        </aside>

        {/* --- Main Content: Product Grid --- */}
        <main
          className={`col-span-12 lg:col-span-9 relative transition-opacity duration-500 ${isFetching ? "opacity-30" : "opacity-100"}`}
        >
          {products.length === 0 ? (
            <div className="h-96 flex items-center justify-center border border-dashed border-gray-100">
              <p className="text-gray-400 font-light tracking-widest uppercase text-xs">
                No Items Found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
              {products.map((product: Product) => (
                <ProductCard
                  key={product._id}
                  product={{
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0]?.url,
                    rating_count: product.rating_count,
                  }}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
}

export default ProductFilter;
