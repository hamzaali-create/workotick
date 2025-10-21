"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

interface Children {
  children: ReactNode;
}

export default function Subscriber({ children }: Children) {
  const activeOrganization = useSelector(
    (state: any) => state.auth?.activeOrganization
  );


  console.log(activeOrganization, "activeOrganization")

  const router = useRouter();

  useEffect(() => {
    if (activeOrganization?.role === "admin" && !activeOrganization?.plan) {
      router.push("/plans");
    }
  }, [activeOrganization, router]);

  return <>{activeOrganization?.plan && children}</>;
}
