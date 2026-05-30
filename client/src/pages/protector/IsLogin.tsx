import type { RootState } from "@/store"
import { useCurrentUserQuery } from "@/store/slices/userApi";
import type React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router";

function IsLogin({children}: {children: React.ReactNode}) {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const { isError } = useCurrentUserQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || isError) {
            navigate('/');
        }
    }, [userInfo])
  return <>{children}</>
}

export default IsLogin
