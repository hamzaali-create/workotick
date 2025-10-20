import React, { useCallback, useEffect, useState } from "react";
import { Tooltip } from "antd";
import {
  FieldTimeOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import Api from "../../utils/Axios";
import { useSelector } from "react-redux";
import { tooltip } from '../../utils/tooptiips';
import MyReportStatus from "../Skeletons/MyReportStatus";
import LazyLoad from "../LazyLoad";

export default function Status({ date }) {

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const { activeOrganization } = useSelector((state) => state.auth);

  const capitalizeWords = (str: string) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  const getQuickStats = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await Api.Post(
        `/organization/${activeOrganization?.id}/my-report/quick-stats`,
        {
          date: date.toISOString()
        }
      );
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }, [activeOrganization, date]);

  useEffect(() => {
    const fetchData = async () => {
      await getQuickStats();
    };

    fetchData();

    const interval = setInterval(fetchData, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, [getQuickStats]);

  return (
    <LazyLoad loading={loading} loader={<MyReportStatus />}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-x-5">
        <div className="col-span-1 bg-white   rounded-xl p-4 relative">
          <Tooltip
            title={tooltip.activeTime}
            className="absolute right-1 p-2 top-1"
          >
            <InfoCircleOutlined style={{ color: "#3376FF" }} />
          </Tooltip>
          <div className="flex gap-x-2">
            <div className="bg-[#8280FF]  rounded-xl p-4">
              <HistoryOutlined className="text-3xl text-white" />
            </div>

            <div className="">
              <p className="text-sm  font-medium mt-1 text-[#585B5E]">
                Active Time
              </p>
              <p className=" font-medium text-3xl">{stats.active_time}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-white  rounded-xl p-4 relative">
          <Tooltip
            title={tooltip.loggedTime}
            className="absolute right-1 p-2 top-1"
          >
            <InfoCircleOutlined style={{ color: "#3376FF" }} />
          </Tooltip>
          <div className="flex gap-x-2">
            <div className="bg-[#FEC53D] rounded-xl p-3">
              <FieldTimeOutlined className="text-4xl text-white" />
            </div>
            <div className="">
              <p className="text-sm mt-1 font-medium text-[#585B5E]">
                Logged Time
              </p>
              <p className=" font-medium text-3xl">{stats.logged_time}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-white  rounded-xl p-4 relative">
          <Tooltip
            title={tooltip.currentStatus}
            className="absolute right-1 p-2 top-1"
          >
            <InfoCircleOutlined style={{ color: "#3376FF" }} />
          </Tooltip>
          <div className="flex gap-x-2">
            <div className="bg-[#8280FF] rounded-xl p-4">
              <LineChartOutlined className="text-3xl text-white" />
            </div>
            <div className="">
              <p className="text-sm mt-1 font-medium text-[#585B5E]">
                Current Status
              </p>
              <p className=" font-medium text-3xl capitalize">{stats.app_status}</p>
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
