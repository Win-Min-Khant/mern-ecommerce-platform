import type { RootState } from "@/store";
import { CircleUserRound, Search, ShoppingCart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router";
import { clearUserInfo } from "@/store/slices/auth";
import { useLogoutMutation } from "@/store/slices/userApi";
import { toast } from "sonner";

interface TopHeaderProps {
  toggleCart: () => void;
}

function TopHeader({ toggleCart }: TopHeaderProps) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [logoutMutation] = useLogoutMutation();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // ၂။ URL ကနေ `keyword` တန်ဖိုးကို စတင်ဖတ်ယူပြီး State တည်ဆောက်ခြင်း
  const [keyword, setKeyword] = useState("");

  // ၅။ User က စာရိုက်ပြီး Enter ခေါက်လိုက်ရင် ချက်ချင်း ရှာဖွေရေးစာမျက်နှာကို ပို့ပေးမယ့်စနစ်
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);

    if (keyword.trim() !== "") {
      params.set("keyword", keyword.trim());
    } else {
      params.delete("keyword");
    }

    navigate(`/products/filter?${params.toString()}`, { replace: true });
  };

  const handleLogout = async () => {
    try {
      await logoutMutation({}).unwrap();
      toast.success("Logout Successfully.");
      dispatch(clearUserInfo());
      navigate("/login");
    } catch (err) {
      console.warn("Logout request failed", err);
      toast.error("Logout request failed.");
    }
  };

  return (
    <nav className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto flex w-full flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center justify-between gap-4 md:w-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold cursor-pointer select-none"
            onClick={() => navigate("/")}
          >
            KESH.COM
          </h2>

          {/* mobile search icon */}
          <button
            type="button"
            onClick={() => setShowMobileSearch((s) => !s)}
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Toggle search"
          >
            <Search className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* desktop search form */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xl min-w-0 bg-white relative rounded-full overflow-hidden items-center"
        >
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="outline-none py-2 ps-5 w-full text-black placeholder:text-gray-400"
            type="text"
            placeholder="Search products..."
          />
          <button type="submit" className="pe-4" aria-label="Search">
            <Search className="text-gray-500 cursor-pointer hover:text-black transition-colors" />
          </button>
        </form>

        <div className="flex w-full flex-wrap items-center justify-end gap-3 md:w-auto">
          <ShoppingCart
            onClick={toggleCart}
            className="cursor-pointer hover:text-gray-300 transition-colors"
          />

          {userInfo ? (
            <>
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors cursor-pointer"
              >
                <CircleUserRound className="h-5 w-5" />
                Profile
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="hidden md:inline-flex rounded-full border border-white px-4 py-2 text-sm font-semibold text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                Logout
              </button>

              {/* mobile profile button */}
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-sm md:hidden cursor-pointer"
              >
                <CircleUserRound className="h-4 w-4" />
                <span className="text-xs">Profile</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="hidden md:inline-flex rounded-full border border-white px-4 py-2 text-sm font-semibold text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="hidden md:inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Register
              </button>

              {/* mobile login button */}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-sm md:hidden cursor-pointer"
              >
                <CircleUserRound className="h-4 w-4" />
                <span className="text-xs">Login</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* mobile search form slider */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pt-3 pb-2 animate-in fade-in duration-200">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-full overflow-hidden flex items-center"
          >
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="outline-none py-2 ps-5 w-full text-black placeholder:text-gray-400"
              type="text"
              placeholder="Search products..."
            />
            <button type="submit" className="pe-4" aria-label="Search">
              <Search className="text-gray-500 cursor-pointer hover:text-black transition-colors" />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}

export default TopHeader;
