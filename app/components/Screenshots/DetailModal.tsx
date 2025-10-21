

import Avatar from "antd/es/avatar";
import Modal from "antd/es/modal";
import Progress from "antd/es/progress";
import Button from "antd/es/button";
import Skeleton from "antd/es/skeleton";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { getActivityColor } from "./Screenshot";
import RestrictedImages from "@/app/components/RestrictedImage";
import Api from "@/utils/Axios";


export default function DetailModal({
  open,
  onClose,
  screenshot,
  onNext,
  onPrev,
}) {
  const sliderRef = useRef(null);

  const { activeOrganization } = useSelector((state) => state.auth);
  const [newScreenshot, setNewScreenshot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        onPrev();
      } else if (event.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onPrev, onNext]);

  const handleScreenshotChange = useCallback(async () => {
    if (!activeOrganization?.id || !screenshot) return;
    try {
      setLoading(true);
      const { data } = await Api.Get(
        `/organization/${activeOrganization?.id}/screenshot/${screenshot.id}`
      );
      setNewScreenshot(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [screenshot, activeOrganization?.id]);

  useEffect(() => {
    handleScreenshotChange();
  }, [handleScreenshotChange]);

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        footer={false}
        className="w-10/12 mt-4"
        centered
      >
        {loading ? (
          <div className="relative font-poppins">
            {/* Image skeleton */}
            <div className="flex justify-center">
              <Skeleton.Image
                active
                className="h-[400px] max-w-[650px] w-[1200px] rounded-md"
              />
            </div>
            {/* Details skeleton */}
            <ScreenshotDetailsLoader />
          </div>
        ) : newScreenshot ? (
          <div className="">
            <Slider ref={sliderRef}>
              <div>
                <div className="relative font-poppins">
                  <div className="flex justify-center">
                    <RestrictedImages
                      loaderCss="h-[400px] max-w-[650px] w-[1200px]"
                      src={newScreenshot?.screenshot}
                      className="py-5 p-3 w-full h-[400px] object-contain"
                    />
                  </div>
                  {/* <ScreenshotDetails screenshot={newScreenshot} /> */}
                  <div className="absolute top-1/2 transform -translate-y-1/2   rounded-full p-1 bg-white">
                    <Button
                      className="rounded-full h-10 w-10 flex justify-center items-center"
                      onClick={onPrev}
                    >
                      <LeftOutlined />
                    </Button>
                  </div>
                  <div className="absolute top-1/2 transform -translate-y-1/2 -0  md:right-0 lg:right-0 bg-white rounded-full p-1">
                    <Button
                      className="rounded-full h-10 w-10 flex justify-center items-center"
                      onClick={onNext}
                    >
                      <RightOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        ) : null}
      </Modal>
    </>
  );
}

export const ScreenshotDetails = ({ className = null, screenshot }) => {
  const { activeOrganization } = useSelector((state) => state.auth);

  return (
    <div className={`grid grid-cols-2 font-poppins mt-4 gap-6 ${className}`}>
      <div className="col-span-1 flex items-center">
        <div className="w-1/2">
          <div className="flex  items-center gap-2">
            <Avatar
              src={screenshot.user.avatar}
              size={50}
              shape="circle"
              icon={<UserOutlined />}
              style={{ borderRadius: "30px" }}
            />
            <div>
              <h3 className="font-semibold text-left">
                {screenshot.user.name}
              </h3>
              <p className="text-xs text-left ">{screenshot.user.job_title}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex justify-between font-poppins">
            <p className="text-[#6A7B83] font-slightly-bold text-sm">
              Activity
            </p>
            <p className="font-slightly-bold text-[#263238] text-sm">
              {screenshot.activity}
            </p>
          </div>
          <Progress
            strokeLinecap="butt"
            percent={parseInt(screenshot.activity.replace("%", ""))}
            showInfo={false}
            strokeColor={getActivityColor(
              parseInt(screenshot.activity.replace("%", ""))
            )}
          />
          <p
            style={{
              backgroundColor: getActivityColor(
                parseInt(screenshot.activity.replace("%", ""))
              ),
            }}
            className={`p-2 w-full text-white my-2 rounded-sm font-poppins text-center`}
          >
            {screenshot.score}
          </p>
        </div>
      </div>
      <div className="col-span-1 flex">
        <div className=" w-1/2">
          <div className="flex font-poppins mb-4">
            <p className="text-[#6A7B83] font-slightly-bold text-sm">
              Project:{" "}
            </p>
            <p className="font-slightly-bold text-[#263238] text-sm mx-5">
              {screenshot?.project == "N/A"
                ? "No Project Assigned"
                : screenshot?.project}
            </p>
          </div>
          <div className="flex font-poppins my-4">
            <p className="text-[#6A7B83] font-slightly-bold text-sm">Memo: </p>
            <p className="font-slightly-bold text-sm mx-5">
              {screenshot.memo ?? "No Memo"}
            </p>
          </div>
          <div className="flex font-poppins my-4">
            <p className="text-[#6A7B83] font-slightly-bold text-sm">
              Active Window:{" "}
            </p>
            <p className="font-slightly-bold text-[#263238] text-sm truncate ml-2">
              {screenshot.title}
            </p>
          </div>
        </div>
        <div className=" w-1/2">
          <div className="flex font-poppins my-4  flex-nowrap">
            <p className="text-[#6A7B83] font-slightly-bold text-sm whitespace-nowrap">
              Time interval:{" "}
            </p>
            <p className="font-slightly-bold text-[#263238] text-sm mx-5 whitespace-nowrap">
              {getFormattedTimestamp(
                screenshot.interval_start_at,
                activeOrganization.timezone,
                "hh:mm A"
              )}{" "}
              -{" "}
              {getFormattedTimestamp(
                screenshot.interval_end_at,
                activeOrganization.timezone,
                "hh:mm A"
              )}
            </p>
          </div>
          <div className="flex font-poppins my-4">
            <p className="text-[#6A7B83] font-slightly-bold text-sm">
              Capture Time:{" "}
            </p>
            <p className="font-slightly-bold text-[#263238] text-sm mx-5">
              {getFormattedTimestamp(
                screenshot.created_at,
                activeOrganization.timezone,
                "hh:mm A"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ScreenshotDetailsLoader = () => {
  return (
    <div className="grid grid-cols-2 font-poppins mt-4 gap-6">
      {/* Left column - User info and activity */}
      <div className="col-span-1 flex items-center">
        <div className="w-1/2">
          <div className="flex items-center gap-2">
            <Skeleton.Avatar active size={50} shape="circle" />
            <div className="space-y-2">
              <Skeleton.Input active size="small" className="w-24" />
            </div>
          </div>
        </div>
        <div className="w-1/2 space-y-2">
          <div className="flex justify-between">
            <Skeleton.Input active size="small" className="w-16" />
          </div>
          <Skeleton active paragraph={{ rows: 1, width: '100%' }} title={false} />
          <Skeleton.Button active block className="h-8 rounded-sm" />
        </div>
      </div>
      
      {/* Right column - Project and time details */}
      <div className="col-span-1 flex">
        <div className="w-1/2 space-y-4">
          <div className="flex">
            <Skeleton.Input active size="small" className="w-16 mr-5" />
          </div>
          <div className="flex">
            <Skeleton.Input active size="small" className="w-12 mr-5" />
          </div>
          <div className="flex">
            <Skeleton.Input active size="small" className="w-20 mr-2" />
          </div>
        </div>
        <div className="w-1/2 space-y-4">
          <div className="flex">
            <Skeleton.Input active size="small" className="w-15 mr-5" />
            <Skeleton.Input active size="small" className="w-15" />
          </div>
          <div className="flex">
            <Skeleton.Input active size="small" className="w-15 mr-5" />
            <Skeleton.Input active size="small" className="w-15" />
          </div>
        </div>
      </div>
    </div>
  );
};
