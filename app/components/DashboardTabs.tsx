import React from "react";
import { Tabs } from "antd";
// import "../index.css";
// import MyReport from "./ReportPage/MyReport";
// import TeamReport from "./ReportPage/TeamReport";
import { useSelector } from "react-redux";
import { hasRole } from "@/utils/permissions";
import MyReport from "./ReportPage/MyReport";



export default function DashboardTabs() {
  const activeOrganization = useSelector(
    (state: any) => state.auth?.activeOrganization
  );

  const tabs = [
    {
      label: "My Report",
      key: "1",
      children: <MyReport />,
    },
    {
      label: "Team Report",
      key: "2",
      // children: <TeamReport />,
    },
  ];

  return (
    <div className="dashboard w-full relative">
      {hasRole(activeOrganization, ["admin", "department_head"])  ? (
        <Tabs
          type="card"
          defaultActiveKey="1"
          items={tabs.map((tab:any) => ({
            key: tab.key,
            label: (
              <span className="pl-2">
                <button className="text-xl bg-blue-500 text-white rounded-md text-center font-poppins">
                  {tab.label}
                </button>
              </span>
            ),
            ...tab,
          }))}
        />
      ) :  <MyReport />
      }
    </div>
  );
}
