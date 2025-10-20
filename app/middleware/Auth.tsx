"use client";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AuthApi } from "../redux/services/auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface Children {
  children: ReactNode;
}

export default function Auth({ children }: Children) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useAppSelector((state: any) => state.auth);

  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(
        `/login?${searchParams.toString()}&redirectTo=${pathname}?${searchParams.toString()}`
      );
    } else {
      dispatch(AuthApi.endpoints.getUserDetails.initiate());
    }
  }, [isAuthenticated, dispatch, pathname, router, searchParams]);

  return <>{isAuthenticated && children}</>;
}
