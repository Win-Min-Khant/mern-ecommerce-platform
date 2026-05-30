import type { RootState } from "@/store";
import { CircleUserRound, Search, ShoppingCart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
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

  // 🚀 ၁။ Ref ကို အသုံးပြုပြီး Component ရဲ့ ပထမဆုံး Render ကို ဖမ်းယူခြင်း
  const isFirstRender = useRef(true);

  const [logoutMutation] = useLogoutMutation();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // ၂။ URL ကနေ `keyword` တန်ဖိုးကို စတင်ဖတ်ယူပြီး State တည်ဆောက်ခြင်း
  const [keyword, setKeyword] = useState(() => {
    return new URLSearchParams(window.location.search).get("keyword") || "";
  });

  // 🌟 ၃။ [THE SAFE DEBOUNCE EFFECT] - စာရိုက်တာရပ်ပြီး 500ms ကြာမှ အလုပ်လုပ်မယ့်စနစ်
  useEffect(() => {
    // ကာကွယ်ရေး (က) - စာမျက်နှာ စတက်တက်ချင်း (Initial Render) မှာ အောက်ကကုတ်တွေကို လုံးဝမပတ်စေရဘူး
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // ကာကွယ်ရေး (ခ) - [🌟 အဓိကအကျဆုံးအချက်]
    // လက်ရှိ ရောက်နေတဲ့စာမျက်နှာက "/products/filter" မဟုတ်ရင် ဒီ Debounce Timer ကြီးကို လုံးဝ မဖွင့်ခိုင်းတော့ပါဘူး Bro။
    // ဒါကြောင့် /admin/create-product ပေါ်မှာ ရောက်နေချိန်မှာ ဒီကောင်က လုံးဝ ငြိမ်သက်နေမှာ ဖြစ်ပါတယ်။
    if (location.pathname !== "/products/filter") {
      return;
    }

    // လမ်းကြောင်းက filter page ဖြစ်နေပြီဆိုမှ... User ရိုက်လိုက်တဲ့စာသားအတိုင်း URL Query လိုက်ပြောင်းမယ့် Timer ပွင့်မယ်
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (keyword.trim() !== "") {
        params.set("keyword", keyword.trim());
      } else {
        params.delete("keyword");
      }

      navigate(`/products/filter?${params.toString()}`, { replace: true });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, location.pathname, navigate]);

  // 🌟 ၄။ URL Bar ထဲက အပြောင်းအလဲကို ကြည့်ပြီး Input Box ထဲကစာသားကို လိုက်ညှိပေးတဲ့ Effect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keywordFromUrl = params.get("keyword") || "";

    // တကယ်လို့ User က Home Page (/) ကို ပြန်သွားရင် Search Box ထဲက စာသားတွေကိုပါ အလိုအလျောက် Clear လုပ်ပေးမယ်
    if (location.pathname === "/") {
      setKeyword("");
    } else if (keywordFromUrl !== keyword) {
      setKeyword(keywordFromUrl);
    }
  }, [location.search, location.pathname, keyword]);

  // ၅။ User က စာရိုက်ပြီး Enter ခေါက်လိုက်ရင် ချက်ချင်း ရှာဖွေရေးစာမျက်နှာကို ပို့ပေးမယ့်စနစ်
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

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
