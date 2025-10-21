import Avatar from "antd/es/avatar";
import Dropdown from "antd/es/dropdown";
import Progress from "antd/es/progress";
import Tooltip from "antd/es/tooltip";

import { UserOutlined } from "@ant-design/icons";

// import RestrictedImages from "../RestrictedImage";
import { useSelector } from "react-redux";
// import DeleteScreenshotModal from "../Modals/DeleteScreenshotModal";
import React, { useCallback, useEffect, useState } from "react";
import { getFormattedTimestamp } from "@/utils/helpers";

export const getActivityColor = (score:number) => {
  if (score === 0) {
    return "#EE3636";
  } else if (score > 0 && score <= 30) {
    return "#EE3636";
  } else if (score > 30 && score <= 70) {
    return "#FF7A00";
  } else if (score > 70 && score <= 100) {
    return "#73C255";
  } else {
    return "#EE3636";
  }
};

export default function Screenshot({
  screenshot,
  onRefresh,
  onClick = () => {},
  onDelete = (screenshot)  =>  {},
}: any) {
  const handlers = {
    "0": () => onDelete(screenshot),
  };

  const auth = useSelector((state: any) => state.auth);

  const { activeOrganization, user } = auth;

  const items = [
    {
      label: (
        <div
          onClick={() => handleScreenshotDelete(screenshot)}
          className="text-red-500 flex gap-x-2 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Delete
        </div>
      ),
      key: "0",
    },
  ];

  const handleMenuClick = ({ key }:any) => {
    const handler = handlers[key] as any;
    return handler();
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState(undefined);

  // const handleDeleteModalClose = () => {
  //   setSelectedScreenshot(undefined);
  //   setShowDeleteModal(false);
  // }

  const handleDeleteModalClose = useCallback((refresh) => {
    if (refresh) {
      onRefresh();
    }
    setSelectedScreenshot(undefined);
    setShowDeleteModal(false);
  }, []);

  const handleScreenshotDelete = (screenshot) => {
    setSelectedScreenshot(screenshot);
    setShowDeleteModal(true);
  };

  return (
    <>
      {/* <DeleteScreenshotModal
        open={showDeleteModal}
        onClose={handleDeleteModalClose}
        screenshot={selectedScreenshot}
      /> */}
      <div key={screenshot.id} className="bg-[#F0F4F9] rounded-md p-3 pt-0">
        <div className="flex items-center gap-2 py-2 justify-between">
          <div className="flex gap-x-2 items-center">
            <Avatar
              src={screenshot.user.avatar}
              size={40}
              shape="circle"
              icon={<UserOutlined />}
              style={{ borderRadius: "30px" }}
            />
            <h3 className="text-[#263238] text-left font-slightly-bold text-sm">
              <Tooltip
                title={screenshot.user.name}
                overlayStyle={{ maxWidth: 300 }}
              >
                <span className="cursor-pointer">
                  {screenshot.user.name.length > 10
                    ? screenshot.user.name.substring(0, 10) + "..."
                    : screenshot.user.name}
                </span>
              </Tooltip>
            </h3>
          </div>
          {(activeOrganization.role === "admin" ||
            user.id === screenshot.user.id) && (
            <Dropdown
              menu={{ items, onClick: handleMenuClick }}
              trigger={["click"]}
              placement="bottomRight"
            >
              {/* eslint-disable-next-line */}
              <a href="#" onClick={(e) => e.preventDefault()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </a>
            </Dropdown>
          )}
        </div>
        {/* <RestrictedImages
          src={`${screenshot.screenshot}`}
          className="cursor-pointer w-full"
          onClick={onClick}
        /> */}
        <div className="my-2 cursor-auto">
          <div className="grid grid-cols-[1fr_1.5fr] gap-x-4 gap-y-3 font-poppins">
            <div className="text-[#6A7B83] font-slightly-bold text-sm">
              Project
            </div>
            <div className="font-slightly-bold text-[#263238] text-sm text-right">
              {screenshot?.project == "N/A" ? "---" : screenshot?.project}
            </div>

            <div className="text-[#6A7B83] font-slightly-bold text-sm">
              Date
            </div>
            <div className="font-slightly-bold text-[#263238] text-sm text-right">
              {/* {getFormattedTimestamp(
                screenshot.created_at,
                activeOrganization.timezone,
                "YYYY-MM-DD"
              )} */}
            </div>

            <div className="text-[#6A7B83] font-slightly-bold text-sm">
              Time
            </div>
            <div className="font-slightly-bold text-[#263238] text-sm text-right">
              {/* {getFormattedTimestamp(
                screenshot.created_at,
                activeOrganization.timezone,
                "hh:mm A"
              )} */}
            </div>

            <div className="text-[#6A7B83] font-slightly-bold text-sm">
              Activity
            </div>
            <div className="font-slightly-bold text-[#263238] text-sm text-right">
              {screenshot.activity}
            </div>
          </div>
          <div className="mt-3">
            <Progress
              strokeLinecap="butt"
              percent={parseInt(screenshot.activity.replace("%", ""))}
              showInfo={false}
              strokeColor={getActivityColor(
                parseInt(screenshot.activity.replace("%", ""))
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}
