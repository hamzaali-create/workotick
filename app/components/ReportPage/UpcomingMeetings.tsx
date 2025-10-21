import Empty from "antd/es/empty";
import Button from "antd/es/button";
import React, { useCallback, useState } from "react";
import LocationIcon from "../../assets/location.svg";
import CalenderIcon from "../../assets/calender.svg";
import TimeIcon from "../../assets/clock.svg";
import GroupedAvatar from "./GroupedAvatar";
import MeetingAvatar from "./MeetingAvatar";
// import { getFormattedTimestamp } from "../../utils/helpers";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { getFormattedTimestamp } from "@/utils/helpers";
// import MeetingModal from "../../components/Meetings/MeetingModal";

export default function UpcomingMeetings({ meetings }: any) {
  const activeOrganization = useSelector(
    (state: any) => state.auth?.activeOrganization
  );
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  const isMeetingTime = useCallback((time: any) => {
    return dayjs().isSame(dayjs(time));
  }, []);

  const handleCancel = useCallback(() => {
    setShowMeetingModal(false);
  }, []);

  return (
    <div className="rounded-md bg-white mt-5 p-4 py-9">
      <p className="text-xl font-medium mt-1 my-4">Upcoming Meetings</p>
      {meetings.length <= 0 && (
        <Empty description="No upcoming meeting available" />
      )}
      {meetings.map((meeting: any) => (
        <div
          className="grid grid-cols-7 xl:grid-cols-8 bg-[#FAFAFA] my-4 rounded-md"
          key={meeting.id}
        >
          <div className="xl:col-span-4 col-span-7 md:col-span-3 rounded-md p-3">
            <p className="font-semibold">{meeting.name}</p>
            <span className="flex text-sm gap-2 my-2 text-smtext">
              <img src={LocationIcon} alt="location icon" />
              {meeting.type === "online" ? (
                <a
                  href={meeting.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-24 text-center text-white rounded-md py-1 bg-primary block"
                >
                  Join
                </a>
              ) : (
                meeting.location
              )}
            </span>

            <div className="flex border w-fit text-white lg:flex-row flex-col">
              <div
                className={`flex text-xs gap-2 ${
                  isMeetingTime(meeting.start_time)
                    ? "bg-white text-smtext"
                    : "bg-primary  text-white"
                } w-fit px-2 items-center p-1 rounded-s-sm`}
              >
                <img
                  src={CalenderIcon}
                  alt="location icon"
                  className={
                    getFormattedTimestamp(meeting.start_time,"utc","hh:mm A") === dayjs().format("hh:mm A")
                      ? ""
                      : "filter-white"
                  }
                />
                <p>
                  {getFormattedTimestamp(meeting.start_time,activeOrganization.timezone,"DD MMMM YYYY")}
                </p>
              </div>
              <div
                className={`flex text-xs gap-2 w-24 items-center ${
                  isMeetingTime(meeting.start_time)
                    ? "bg-[#9854CB4D] text-[#32186F]"
                    : "bg-[#3161C2]  text-white"
                }  p-1  rounded-e-sm`}
              >
                <img
                  src={TimeIcon}
                  alt="location icon"
                  className={
                    getFormattedTimestamp(
                      meeting.start_time,
                      "utc",
                      "hh:mm A"
                    ) === dayjs().format("hh:mm A")
                      ? ""
                      : "filter-white"
                  }
                />
                <p>{dayjs(meeting.start_time).format("hh:mm A")}</p>
              </div>
            </div>
            {isMeetingTime(meeting.start_time) && (
              <Button type="primary" className="mt-4 w-4/5 bg-primary">
                Join Now
              </Button>
            )}
          </div>
          <div className="xl:col-span-2 col-span-7 md:col-span-2  bg-[#EDEDED] p-3">
            <p className="font-semibold">Attendees</p>
            <GroupedAvatar users={meeting.attendees} />
          </div>
          <div className="xl:col-span-2 col-span-7 md:col-span-2 p-3 px-5">
            <p className="font-semibold">Host</p>
            <div className="mt-6">
              <MeetingAvatar user={meeting.host} />
            </div>
          </div>
        </div>
      ))}
      {/*<Button className="w-full rounded-md font-semibold h-10 mt-5" onClick={() => navigate('/meetings')}>*/}
      {/*  Host Meeting*/}
      {/*</Button>*/}
      <Button
        className="w-full rounded-md font-semibold h-10 mt-5"
        onClick={() => setShowMeetingModal(true)}
      >
        Host Meeting
      </Button>
      {/* <MeetingModal
        onClose={handleCancel}
        open={showMeetingModal}
      /> */}
    </div>
  );
}
