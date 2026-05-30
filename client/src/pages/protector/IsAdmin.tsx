import type { RootState } from "@/store";
import { useCurrentUserQuery } from "@/store/slices/userApi";
import type React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function IsAdmin({ children }: { children: React.ReactNode }) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  // 🚀 isLoading ရော isFetching ကိုပါ ယူထားရမယ် Bro (RTK Query ရဲ့ Flash State ကို တားဖို့)
  const { data: user, isError, isLoading, isFetching } = useCurrentUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    // 🌟 အကွက် (၁) - ဒေတာတွေ ဆွဲနေတုန်း (Loading သို့မဟုတ် Fetching ဖြစ်နေတုန်း) ဆိုရင်
    // ဘာမှမလုပ်ဘဲ ငြိမ်ငြိမ်လေး စောင့်နေခိုင်းရမယ် Bro။ လုံးဝ ဇွတ် navigate မလုပ်ရဘူး!
    if (isLoading || isFetching) return;

    // 🌟 အကွက် (၂) - Loading တွေ အကုန်ပြီးသွားလို့ ဒေတာအမှန် ထွက်လာပြီဆိုမှ တကယ်စစ်မယ်
    if (!userInfo || isError || user?.role !== "admin") {
      console.log("🚨 Not an Admin or Error! Redirecting to Home...");
      navigate("/", { replace: true }); // replace: true သေချာပေါက် ထည့်ပါ Bro
    }
  }, [userInfo, isError, user, navigate, isLoading, isFetching]);

  // ဒေတာ တက်မလာသေးခင် စာမျက်နှာ အဖြူကြီး ဖြစ်မနေအောင် Loading ပြထားမယ် Bro
  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-lg font-semibold tracking-wider animate-pulse">
          VERIFYING ADMIN ACCESS...
        </div>
      </div>
    );
  }

  // Admin ဖြစ်တာ သေချာပြီဆိုမှ children component ကို ပွင့်ပေးမယ်
  return user?.role === "admin" ? <>{children}</> : null;
}

export default IsAdmin;
