"use client"
import React, { useCallback, useEffect, useMemo, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import TimeSummaryData from "./TimeSummaryData";
import { useSelector } from "react-redux";



import Api from "@/utils/Axios";
import LazyLoad from "../LazyLoad";
import TimeSummaryLoader from "../Skeletons/TimeSummaryLoader";
import dynamic from "next/dynamic";

export default function TimeSummary({ date }:any) {
  const [loading, setLoading] = useState(false);
  const [timeLog, setTimeLog] = useState([]);
  const [chartData, setChartData] = useState(null);
  const auth = useSelector((state: any) => state.auth);

  const { activeOrganization, user } = auth;

  const state = useMemo(() => {
    return {
      series: [
        {
          name: user.name,
          data: timeLog?.chart_data?.dataset ?? [],
        },
      ],
      options: {
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.5,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          categories: [],
          labels: {
            formatter: function (val) {
              return val + "%";
            },
          },
        },
        xaxis: {
          categories: timeLog?.chart_data?.labels ?? [],
          type: "time",
        },
      },
    };
  }, [timeLog, user]);

  const getTimeLog = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.Post({
        url: `/organization/${activeOrganization?.id}/my-report/time-summary`,
        postData: {
          date: date.toISOString(),
        },
      });
      setTimeLog(data);
    } catch (error) {
      console.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [activeOrganization, date]);

  useEffect(() => {
    setChartData(state);
  }, [state]);

  useEffect(() => {
    getTimeLog();
  }, [getTimeLog]);

  return (
    <LazyLoad loading={loading} loader={<TimeSummaryLoader />}>
      <div className="bg-white px-5 pt-5 mt-3 rounded-md time-summary flex-grow">
        <h1 className="text-lg font-semibold mt-1">Time Summary</h1>
        <TimeSummaryData
          projects={timeLog?.projects ?? []}
          total={timeLog?.total ?? null}
        />
        <h1 className="text-lg font-semibold mt-1">Activity Chart</h1>
        {chartData && (
          <Chart
            options={chartData.options}
            series={chartData.series.map((series) => ({
              ...series,
              data: series.data.map((value) =>
                parseFloat(parseFloat(value).toFixed(0))
              ), // Convert, round, and keep as a number
            }))}
            type="area"
            width="100%"
            height="70%"
          />
        )}
      </div>
    </LazyLoad>
  );
}
