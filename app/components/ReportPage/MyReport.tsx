"use client"
import React, { useCallback, useEffect, useState } from "react";
import Status from "./Status";

import UpcomingMeetings from "./UpcomingMeetings";
import Summary from "./Summary";
import TimeSummary from "./TimeSummary";
import ActivityLog from "./ActivityLog";
import { useSelector } from "react-redux";
import Api from "@/utils/Axios";
import { canViewScreenshots } from "@/utils/permissions";
import LazyLoad from "../LazyLoad";
import UpcomingMeetingLoader from "../Skeletons/UpcomingMeetingLoader";
import RecentActivities from "../Skeletons/RecentActivities";
import dayjs from "dayjs";
import CustomDatePicker from "../CustomDatePicker";

export default function MyReport() {
  const activeOrganization = useSelector(
    (state: any) => state.auth?.activeOrganization
  );
  const [activities, setActivities] = useState<any[]> ([]);
  const [meetings, setMeetings] = useState<any[]> ([]);
  const [screenshotLoading, setScreenshotLoading] = useState<boolean> (false);
  const [date, setCurrentDate] = useState<string| any> (dayjs());
  const [meetingLoading, setMeetingLoading] = useState <boolean>(false);

  const getRecentActivities = useCallback(async () => {
    try {
      setScreenshotLoading(true);
      const { data } = await Api.Post(
        `/organization/${activeOrganization?.id}/my-report/recent-activities`,
        {
          date: date.toISOString(),
        }
      );
      setActivities(data);
    } catch (error) {
      console.error(error);
    } finally {
      setScreenshotLoading(false);
    }
  }, [activeOrganization, date]);

  const getUpcomingMeeting = useCallback(async () => {
    try {
      setMeetingLoading(true);
      const { data } = await Api.Post(
        `/organization/${activeOrganization?.id}/my-report/meetings`,
        {
          date: date.toISOString(),
        }
      );
      setMeetings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setMeetingLoading(false);
    }
  }, [activeOrganization, date]);

  useEffect(() => {
    getUpcomingMeeting();
  }, [getUpcomingMeeting]);

  useEffect(() => {
    if (canViewScreenshots(activeOrganization)) {
      getRecentActivities();
    }
  }, [getRecentActivities, activeOrganization]);

  return (
    <div className="font-poppins">
      <div className="flex mb-4 justify-end">
        <CustomDatePicker onChange={(value) => setCurrentDate(value)} />
      </div>
      {/* <Status date={date} /> */}
      <div className="flex flex-wrap lg:flex-nowrap lg:flex-row gap-2 justify-between">
        <div className="w-full lg:w-8/12">
          {canViewScreenshots(activeOrganization) && (
            <LazyLoad
              loading={screenshotLoading}
              loader={<RecentActivities cards={3} />}
            >
              <RecentActivities
                activities={activities}
                date={date}
                onRefresh={() => getRecentActivities()}
              />
            </LazyLoad>
          )}
          <LazyLoad loading={meetingLoading} loader={<UpcomingMeetingLoader />}>
            {/* <UpcomingMeetings meetings={meetings} /> */}

           
          </LazyLoad>
          {/* <Summary date={date} /> */}
        </div>
        <div className="w-full lg:w-4/12 mt-2 flex flex-wrap lg:flex-col flex-grow-0 lg:flex-grow">
          {/* <TimeSummary date={date} />
          <ActivityLog date={date} /> */}
          sadasdsa
        </div>
      </div>
      {/*<Summary date={date} />*/}
      
    </div>
  );
}
