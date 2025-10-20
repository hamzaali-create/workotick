"use client"
import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DashboardTabs from "./components/DashboardTabs";

export default function Home() {
  // const {activeOrganization, isAuthenticated} = useSelector((state:any) => state.auth);
  const auth = useSelector((state: any) => state.auth);
  const { activeOrganization, isAuthenticated } = auth;

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (!activeOrganization) {
        router.push("/organization");
      }
    } else {
      router.push("/login");
    }
  }, [activeOrganization, router, isAuthenticated]);

  if (!activeOrganization) return null;

  return (
    <MainLayout>
      <div className="py-8 md:p-5 font-poppins">
        <div className="flex flex-col md:flex-row my-2 justify-between">
          <h1 className="text-2xl  font-semibold mb-3 pb-10 md:pb-0">
            Dashboard
          </h1>
        </div>

        <div className="justify-between flex">
          <DashboardTabs/>

        </div>
      </div>
    </MainLayout>
  );
}
