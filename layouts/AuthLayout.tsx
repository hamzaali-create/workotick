import React, { ReactNode, useMemo } from "react";
import loginImage from "../app/assets/login.svg";
import workotic from "@/app/assets/workotic-logo.svg";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "antd";
import Image from "next/image";

interface Props {
  children: ReactNode;
  canGoBack?: boolean;
}

export default function AuthLayout({ children, canGoBack = true }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const backToPrevious = useMemo(() => {
    const redirection: any = {
      "/login": "https://workotick.com",
      "/forgot-password": "/login",
      "/verify": "/forgot-password",
      "/reset-password": "/verify",
    };
    return redirection[pathname];
  }, [pathname]);

  return (
    <div className="grid md:grid-cols-12 h-screen grid-cols-5">
      <div className="col-span-5 md:col-span-6 lg:mx-4 lg:col-span-5 px-8 xl:mx-12 mt-16">
        <div className="flex gap-5">
          {canGoBack && (
            <Button
              className="w-10 h-10 flex justify-center items-center p-2"
              onClick={() =>
                backToPrevious?.startsWith("http")
                  ? (window.location.href = backToPrevious)
                  : backToPrevious
                  ? router.replace(backToPrevious)
                  : router.replace("/login")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </Button>
          )}
          <Link href="/">
            <Image
              src={workotic}
              alt="workotic-logo"
              className="w-full h-full"
            />
          </Link>
        </div>
        <div className="my-5">{children}</div>
      </div>
      <div className="col-span-7 md:col-span-6 lg:col-span-7 bg-secondary overflow-hidden hidden md:flex md:justify-center md:items-center">
        <Image src={loginImage} alt="login" className="p-7 w-full h-full" />
      </div>
    </div>
  );
}
