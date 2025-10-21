"use client";
import Api from "@/utils/Axios";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useSelector } from "react-redux";

const TopPerformersChart = ({ date }) => {
  const [chartData, setChartData] = useState({});
  const  activeOrganization  = useSelector((state:any) => state.auth?.activeOrganization);

  const getTopPerformers = useCallback(async () => {
    try {
      const { data } = await Api.Post({
        url: `/organization/${activeOrganization?.id}/team-report/top-performer`,
        postData: {
          date: date.toISOString(),
        },
      });

      // Shorten user names
      const shortenedData = {
        ...data,
        users: data.users.map((name) =>
          name.length > 15 ? name.substring(0, 15) + "..." : name
        ),
      };

      setChartData(shortenedData);
    } catch (error) {
      console.error(error);
    }
  }, [activeOrganization, date]);

  const state = {
    options: {
      chart: {
        id: "top-performers-bar-chart",
        type: "bar",
      },
      xaxis: {
        categories: chartData?.users ?? [],
      },

      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            enabled: false,
          },
        },
      },
    },
    series: [
      {
        name: "Active Hours",
        data: chartData?.hours ?? [],
      },
    ],
  };

  useEffect(() => {
    getTopPerformers();
  }, [getTopPerformers]);

  return (
    <div className="bg-white -mx-4 rounded-md">
      <Chart
        options={{
          ...state.options,
        }}
        series={state.series}
        type="bar"
        width="100%"
        height={400}
      />
    </div>
  );
};

export default TopPerformersChart;
