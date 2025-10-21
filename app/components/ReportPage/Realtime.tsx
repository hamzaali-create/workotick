import React, { useCallback, useEffect, useState } from "react";

import Member1 from "@/app/assets/member-1.svg";
import Member2 from "@/app/assets/member-2.png";
import Member3 from "@/app/assets/member-3.png";

import Button from "antd/es/button";
import Tooltip from "antd/es/tooltip";

import { InfoCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import eye from "../../assets/eye.svg";
import RealTimeModal from "./RealTimeModal";
import TeamStatsLoader from "../Skeletons/TeamStatsLoader";
import LazyLoad from "../LazyLoad";
import Api from "@/utils/Axios";
import { tooltip } from "@/utils/tooptiips";
import Image from "next/image";

export default function Realtime({ date }) {
  const [loading, setLoading] = useState(false);
  const [showRealTimeModal, setShowRealTimeModal] = useState(false);
  const [stats, setStats] = useState({
    total_members: [],
    active_members: [],
    pending_members: [],
    clocked_out_members: [],
  });
  const activeOrganization = useSelector(
    (state: any) => state.auth?.activeOrganization
  );

  const getQuickStats = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.Post({
        url: `/organization/${activeOrganization?.id}/team-report/quick-stats`,
      });

      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [activeOrganization]);

  useEffect(() => {
    getQuickStats();
  }, [getQuickStats]);

  return (
    <>
      <LazyLoad loading={loading} loader={<TeamStatsLoader />}>
        <div className="flex gap-2 items-center my-3 mb-6">
          <p className="text-lg font-semibold font-poppins">Real-Time</p>
          <Button
            type="primary"
            onClick={() => setShowRealTimeModal(true)}
            className="bg-primary rounded-md flex justify-center items-center gap-1 font-poppins"
            icon={<img src={eye} alt="eye-icon" />}
          >
            View
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 gap-4 lg:gap-x-5">
          <div className="col-span-1 bg-white   rounded-xl p-4 relative">
            <Tooltip
              title={tooltip.totalTeamMembers}
              className="absolute right-1 p-2 top-1"
            >
              <InfoCircleOutlined style={{ color: "#3376FF" }} />
            </Tooltip>
            <div className="flex gap-x-2 mt-2">
              <img src={Member1} className="h-15" alt="total-icon" />

              <div className="">
                <p className="text-xs  font-medium mt-1 text-[#585B5E]">
                  Total Team Members
                </p>
                <p className=" font-medium text-3xl">
                  {stats.total_members.length ?? 0}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-white   rounded-xl p-4 relative">
            <Tooltip
              title={tooltip.activeMembers}
              className="absolute right-1 p-2 top-1"
            >
              <InfoCircleOutlined style={{ color: "#3376FF" }} />
            </Tooltip>
            <div className="flex gap-x-2 mt-2">
              <Image src={Member2} className="h-15" alt="active-icon" />

              <div className="">
                <p className="text-xs  font-medium mt-1 text-[#585B5E]">
                  Active Members
                </p>
                <p className=" font-medium text-3xl">
                  {stats.active_members.length ?? 0}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-white   rounded-xl p-4 relative">
            <Tooltip
              title={tooltip.clockedOutMembers}
              className="absolute right-1 p-2 top-1"
            >
              <InfoCircleOutlined style={{ color: "#3376FF" }} />
            </Tooltip>
            <div className="flex gap-x-2 mt-2">
              <Image src={Member2} className="h-15" alt="clockout-icon" />

              <div className="">
                <p className="text-xs font-medium mt-1 text-[#585B5E]">
                  Clocked out members
                </p>
                <p className=" font-medium text-3xl">
                  {stats.clocked_out_members.length ?? 0}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-white   rounded-xl p-4 relative">
            <Tooltip
              title={tooltip.yetToStartMembers}
              className="absolute right-1 p-2 top-1"
            >
              <InfoCircleOutlined style={{ color: "#3376FF" }} />
            </Tooltip>
            <div className="flex gap-x-2 mt-2">
              <Image src={Member3} className="h-15" alt="tostart-icon" />

              <div className="">
                <p className="text-xs  font-medium mt-1 text-[#585B5E]">
                  Yet to start members
                </p>
                <p className=" font-medium text-3xl">
                  {stats.pending_members.length ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </LazyLoad>
      <RealTimeModal
        members={stats}
        open={showRealTimeModal}
        onClose={() => setShowRealTimeModal(false)}
      />
    </>
  );
}
