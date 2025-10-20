import { Space, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import Realtime from "./Realtime";
import RecentActivity from "./RecentActivity";
import TeamTimeSummary from "./TeamTimeSummary";
import TeamReportTable from "./TeamReportTable";
import { useSelector } from "react-redux";
import Api from "../../utils/Axios";
import RecentActivitiesLoader from "../Skeletons/RecentActivities";
import LazyLoad from "../LazyLoad";
import CustomDatePicker from "../CustomDatePicker";
import dayjs from "dayjs";
import { canViewScreenshots } from "../../utils/permissions";

export default function TeamReport() {
  const { activeOrganization } = useSelector((state) => state.auth);
  const [activities, setActivities] = useState([]);
  const [screenshotLoading, setScreenshotLoading] = useState(false);
  const [date, setCurrentDate] = useState(dayjs());

  const getRecentActivities = useCallback(async () => {
    if (!canViewScreenshots(activeOrganization)) {
      return;
    }
    try {
      setScreenshotLoading(true);
      let { data } = await Api.Post(
        `/organization/${activeOrganization?.id}/team-report/recent-activities`,
        {
          date: date.toISOString(),
        }
      );
      data = data.splice(0, 3);
      setActivities(data);
    } catch (error) {
      console.error(error);
    } finally {
      setScreenshotLoading(false);
    }
  }, [activeOrganization, date]);

  useEffect(() => {
    getRecentActivities();
  }, [getRecentActivities, date]);

  return (
    <div className="font-poppins">
      <Realtime date={date} />
      <div className="flex justify-end mt-4">
        <CustomDatePicker onChange={(value) => setCurrentDate(value)} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 h-full">
        <div className="col-span-2 lg:col-span-2 flex flex-col">
          <div className="flex-grow h-full bg-white my-5">
            <LazyLoad
              loading={screenshotLoading}
              loader={<RecentActivitiesLoader cards={9} />}
            >
              <RecentActivity activities={activities} date={date} />
            </LazyLoad>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 p-2 flex flex-col">
          <div className="flex-grow">
            <TeamTimeSummary date={date} />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md p-4 mt-5">
        <Space className="flex justify-between items-center ">
          <Typography.Paragraph className="text-lg font-semibold font-poppins">
            Team Report
          </Typography.Paragraph>
        </Space>
        <TeamReportTable date={date} />
      </div>
    </div>
  );
}
