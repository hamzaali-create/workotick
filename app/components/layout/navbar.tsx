"use client";
import Link from "next/link";
import React from "react";

import { DownOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LogoutIcon from "@/app/assets/LogoutIcon.png";
import profileIcon from "@/app/assets/ProfileIcon.png";
import DownloadIcon from "@/app/assets/download-icon.svg";

import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const Dropdown = dynamic(() => import("antd").then((mod) => mod.Dropdown), {
  ssr: false,
});

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  //   const { windows_build, mac_build } = useSelector(
  //     (state: any) => state.global
  //   );
  const user = useSelector((state: any) => state.auth?.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      //   await dispatch(logout())
      router.push("/login");
    } catch (error) {
      message.error("Something went wrong");
    }
  }, [dispatch, router]);

  const items = [
    {
      label: (
        <div className="flex gap-2 items-center font-poppins">
          <div className="flex items-center">
            <Image
              src={profileIcon}
              alt="profile-icon"
              className="w-full h-full"
            />
          </div>
          Profile
        </div>
      ),
      key: "profile",
    },
    {
      label: (
        <div className="flex gap-2 items-center font-poppins">
          <div className="flex items-center">
            <Image
              src={LogoutIcon}
              alt="profile-icon"
              className="w-full h-full"
            />
          </div>
          Logout
        </div>
      ),
      key: "logout",
    },
  ];

  const handleMenuClick = useCallback(
    ({ key }: any) => {
      const actions: any = {
        profile: () => router.push("/profile"),
        "update-password": () => router.push("update-password"),
        logout: () => handleLogout(),
      };

      const callback = actions[key];

      callback();
    },
    [router, handleLogout]
  );

  return (
    <div className="md:w-4/5  mx-3 flex justify-between items-center">
      <div className="items-center gap-4 hidden lg:flex w-full">
        <p className="text-gray-400 my-1 font-semibold lg:ml-4">
          Download Tracker App
        </p>
        {/* <Link
          type="primary"
          className="h-8 font-poppins bg-primary flex items-center gap-2 text-white rounded-md px-3"
          href={windows_build}
          target="blank"
        >
          Windows
          <img src={DownloadIcon} alt="download icon" className="w-3" />
        </Link>
        <Link
          type="primary"
          className="h-8 font-poppins bg-primary flex items-center gap-2 text-white rounded-md px-3"
          href={mac_build}
          target="blank"
        >
          Mac
          <img src={DownloadIcon} alt="download icon" className="w-3" />
        </Link> */}
      </div>
      <div className="flex items-center  gap-8 md:w-full md:justify-end">
        <div className="flex gap-2">
          <div className="flex items-center justify-center gap-2">
            {/* <Profile isActive={true} pic={user.avatar} /> */}
            <Dropdown
              menu={{ items, onClick: handleMenuClick }}
              trigger={["click"]}
              placement="bottomRight"
              className="flex gap-2 mt-2"
            >
              <button onClick={(e) => e.preventDefault()}>
                <div className="-mt-1">
                  <p className="text-xs leading-4 text-gray-400">Welcome</p>
                  <p className="leading-4 font-semibold line-clamp-1 max-w-[150px]">
                    {user.name}
                  </p>
                </div>
                <DownOutlined className="mt-2 w-4 text-[#737898]" />
              </button>
            </Dropdown>
          </div>
          <div className="flex items-center organization">
            {/* <OrganizationSelector
              organizations={user?.organizations ?? []}
              onChange={(value) => dispatch(setActiveOrganization(value))}
            /> */}
          </div>
        </div>
        {/* <LogoutModal show={showLogout} onClose={() => setShowLogout(false)} /> */}
      </div>
    </div>
  );
}

export default Navbar;
