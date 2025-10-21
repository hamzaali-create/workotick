import Empty from "antd/es/empty";
import Button from "antd/es/button";

import Screenshot from "../Screenshots/Screenshot";
import DetailModal from "../Screenshots/DetailModal";
import { useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { canViewScreenshots } from "@/utils/permissions";
import { Activities, ActivityLog } from "@/type/ActivityLog";

export default function RecentActivity({ activities, date, onRefresh }: any) {

  const activeOrganization = useSelector(
    (state: any) => state.auth?.activeOrganization
  );
  const [screenshots, setScreenshots] = useState([]);
  const [selectedScreenshot, setSelectedScreenshot] = useState<
    ActivityLog | undefined
  >(undefined);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const router = useRouter();

  const handleShowScreenshot = useCallback((screenshot: ActivityLog) => {
    setSelectedScreenshot(screenshot);
    setShowDetailModal(true);
  }, []);

  // const handleSlider = useCallback(
  //   (type) => {
  //     const index = screenshots.findIndex(
  //       (item) => item.id === selectedScreenshot?.id
  //     );

  //     if (index > -1) {
  //       let newScreenshot;
  //       if (type === "next") {
  //         newScreenshot = screenshots[index + 1];
  //       } else {
  //         newScreenshot = screenshots[index - 1];
  //       }
  //       if (newScreenshot) {
  //         setSelectedScreenshot(newScreenshot);
  //       }
  //     }
  //   },
  //   [selectedScreenshot, screenshots]
  // );

  useEffect(() => {
    if (activities) {
      setScreenshots(activities);
    }
  }, [activities]);

  console.log(screenshots, "screenshots");

  return (
    <div className="rounded bg-white mt-5 p-4">
      <div className="flex justify-between ">
        <p className="lg:text-xl font-medium mt-1">Recent Activity</p>
        {canViewScreenshots(activeOrganization) && (
          <Button
            className="bg-[#3376FF] px-6 py-1 text-white rounded-md h-10 border-0"
            onClick={() =>
              router.push(`/screenshots?date=${date.format("YYYY-MM-DD")}`)
            }
          >
            View All
          </Button>
        )}
      </div>
      <div
        className={
          activities.length <= 0
            ? "grid grid-cols-1 my-4"
            : "grid grid-cols-2 xl:grid-cols-3 gap-3 my-7"
        }
      >
        {activities.length <= 0 && (
          <Empty
            description={
              canViewScreenshots(activeOrganization)
                ? "No activity performed yet"
                : "You don't have permission to view screenshots"
            }
          />
        )}
        {activities.map((item: ActivityLog) => (
          <Screenshot
            screenshot={item}
            onRefresh={onRefresh}
            onClick={() => handleShowScreenshot(item)}
          />
        ))}

        {/* <DetailModal
          onClose={() => setShowDetailModal(false)}
          open={showDetailModal}
          screenshot={selectedScreenshot}
          onNext={() => handleSlider("next")}
          onPrev={() => handleSlider("prev")}
        /> */}
      </div>
    </div>
  );
}
