import React, { useState } from "react";

import { MenuUnfoldOutlined } from "@ant-design/icons";
import workotic from "../../assets/workotic-logo.svg";

import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { TbUsers } from "react-icons/tb";
import { PiUsersFour } from "react-icons/pi";
import { FaFilm } from "react-icons/fa6";
import { GrDocumentTime } from "react-icons/gr";
import { AiOutlineProject } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { PiClockUserLight } from "react-icons/pi";
import clsx from "clsx";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import ResponsiveSidebar from "./ResponsiveSidebar";
import { canViewScreenshots, hasFeature, isAdmin } from "@/utils/permissions";
import Image from "next/image";

export default function SidebarContent() {
  const [open, sehrefpen] = useState<boolean>(false);
  const activeOrganization = useSelector(
    (state: any) => state.auth?.activeOrganization
  );
  const pathname = usePathname();
  const isActive = pathname === "/";

  const showDrawer = () => {
    sehrefpen(true);
  };

  const onClose = () => {
    sehrefpen(false);
  };

  return (
    <>
      <button
        className="lg:hidden bg-slate-200 absolute m-2 p-2 px-3 -mt-12 rounded-md mx-2 hover:bg-slate-300"
        onClick={showDrawer}
      >
        <MenuUnfoldOutlined />
      </button>

      <ResponsiveSidebar close={onClose} open={open} width="20%">
        <Link href="/">
          <Image
            src={workotic}
            alt="workotic-logo"
            className=" md:w-44 md:ml-4 lg:mx-4 lg:w-2/3 lg:ml-8 lg:-mt-8 "
          />
        </Link>

        {/* Main Navigation */}
        <div className="md:ml-8 lg:ml-10 xl:ml-14 my-4 lg:my-10 md:my-16 font-medium">
          <div>
            <p className="text-gray-400 my-3 font-medium text-[13px]">
              Insights
            </p>
            <Link
              href="/"
              className={clsx(
                "flex dashboard-link text-[#455A64] items-center gap-3 my-6 hover:text-primary transition-all duration-100 ease-in-out focus:text-primary active:text-primary",
                isActive && "text-primary"
              )}
            >
              <LiaChalkboardTeacherSolid size={25} />
              <p className="text-[15px] ">Dashboard</p>
            </Link>
          </div>
          {hasFeature(activeOrganization, "team-management") && (
             <div>
      <p className="text-gray-400 my-3 font-medium text-[13px]">
        Team Management
      </p>

      {isAdmin(activeOrganization) && (
        <Link
          href="/team"
          className={clsx(
            "flex dashboard-link text-[#455A64] items-center gap-3 my-6 hover:text-primary transition-all duration-100 ease-in-out focus:text-primary active:text-primary",
            {
              "text-primary": pathname === "/team",
            }
          )}
        >
          <TbUsers size={20} />
          <p className="text-[15px]">Team</p>
        </Link>
      )}

      <Link
        href="/department"
        className={clsx(
          "flex dashboard-link text-[#455A64] items-center gap-3 my-6 hover:text-primary transition-all duration-100 ease-in-out focus:text-primary active:text-primary",
          {
            "text-primary": pathname === "/department",
          }
        )}
      >
        <PiUsersFour size={22} />
        <p className="text-[15px]">Departments</p>
      </Link>
    </div>
          )}
          <div>
            <p className="text-gray-400 my-3 font-medium text-[13px]">
              Activity
            </p>
            {canViewScreenshots(activeOrganization) ? (
              <Link
                href="/screenshots"
                className={clsx(
                  "flex dashboard-link text-[#455A64] items-center gap-3 my-6 hover:text-primary transition-all duration-100 ease-in-out focus:text-primary active:text-primary",
                  isActive && "text-primary"
                )}
              >
                <FaFilm size={20} />
                <p className="text-[15px] ">Screenshot</p>
              </Link>
            ) : 

            null}
            {/* {hasFeature(activeOrganization, "timesheet") && (
            <Link
              href="/reports/timesheet/weekly"
              className={({ isActive }) =>
                clsx({
                  "flex dashboard-link  text-[#455A64] items-center gap-3 my-6 hover:text-primary transition-all duration-100 ease-in-out focus:text-primary active:text-primary":
                    true,
                  "text-primary": isActive,
                })
              }
            >
              <GrDocumentTime size={20} />
              <p className="text-[15px] ">Timesheets</p>
            </Link>
          )} */}
          </div>
          <div>
            <p className="text-gray-400 my-3 font-medium text-[13px]">
              Project Management
            </p>

            <Link
              href="/projects"
              className={clsx(
                "flex dashboard-link text-[#455A64] items-center gap-3 my-6 hover:text-primary transition-all duration-100 ease-in-out focus:text-primary active:text-primary",
                isActive && "text-primary"
              )}
            >
              <AiOutlineProject size={22} />
              <p className="text-[15px] ">Projects</p>
            </Link>

            <Link
              href="/meetings"
              className={clsx(
                "flex dashboard-link text-[#455A64] items-center gap-3 my-6 hover:text-primary transition-all duration-100 ease-in-out focus:text-primary active:text-primary",
                isActive && "text-primary"
              )}
            >
              <PiClockUserLight size={25} />
              <p className="text-[15px]">Meetings</p>
            </Link>
          </div>
          <div>
            <p className="text-gray-400 my-3 font-medium text-[13px]">
              Reports
            </p>

            <Link
              href="/reports"
              className={clsx(
                "flex dashboard-link text-[#455A64] items-center gap-3 my-6 hover:text-primary transition-all duration-100 ease-in-out focus:text-primary active:text-primary",
                isActive && "text-primary"
              )}
            >
              <HiOutlineDocumentReport size={22} />
              <p className="text-[15px] ">Reports</p>
            </Link>
          </div>
          {isAdmin(activeOrganization) && (
            <div>
              <p className="text-gray-400 my-3 font-medium text-[13px]">
                Configurations
              </p>
              <Link
                href="/settings"
                className={({ isActive }) =>
                  clsx({
                    "flex dashboard-link  text-[#455A64] items-center gap-3 my-6 hover:text-primary transition-all duration-100 ease-in-out focus:text-primary active:text-primary":
                      true,
                    "text-primary": isActive,
                  })
                }
              >
                <HiOutlineCog6hrefoth size={22} />
                <p className="text-[15px] ">Settings</p>
              </Link>
            </div>
          )}
        </div>
      </ResponsiveSidebar>
    </>
  );
}
