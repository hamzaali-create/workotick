import React, { useCallback, useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import dot1 from "../../assets/dot1.svg";
import dot2 from "../../assets/dot2.svg";
import { useSelector } from "react-redux";
import Api from "../../utils/Axios";
import collect from "collect.js";
import moment from "moment";
import { getFormattedTimestamp } from "../../utils/helpers";

export default function Summary({ date }) {

  const { activeOrganization } = useSelector((state) => state.auth);
  const [weeklySummary, setWeeklySummary] = useState([]);
  const [timeSpent, setTimeSpent] = useState([]);
  const [chartData, setChartData] = useState(null);

  const getWeeklySummary = useCallback(async () => {
    try {
      const { data } = await Api.Post(`/organization/${activeOrganization?.id}/my-report/weekly-summary`,{
        date: date.toISOString()
      })
      const collection = collect(data);
      const min = collection.pluck('time').toArray();
      setWeeklySummary(data);
      setTimeSpent(min)
    } catch (error) {
      console.error(error);
    }
  }, [activeOrganization, date])

  useEffect(() => {
    getWeeklySummary()
  }, [getWeeklySummary])

  const state = useMemo(() => {
    return {
      options: {
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        tooltip: {
          custom: function ({ dataPointIndex }) {
            const ref = weeklySummary[dataPointIndex];
            const tooltipContent = `
              <div class="arrow_box p-4 w-44">
                <h1 class="font-bold text-xs ml-3 mb-3">${moment(ref.day).format('dddd, D MMM YYYY')}</h1>
                <div class="flex gap-x-3 text-xs font-semibold">
                  <img src=${dot1} >
                  <p>Clock in: <span class="inline-block ml-2">${getFormattedTimestamp(ref.meta.clock_in, activeOrganization.timezone, 'hh:mm A')}</span></p>
                </div>
                <div class="flex gap-x-3 text-xs font-semibold">
                  <img src=${dot2} >
                  <p> Clock out: <span class="inline-block ml-2">${getFormattedTimestamp(ref.meta.clock_out, activeOrganization.timezone, 'hh:mm A')}</span></p>
                </div>
                </div>
                <hr class="mt-3"/>
                <div class="flex justify-between text-xs font-semibold mt-1 p-2">
                  <p>Total Availability</p>
                  <p>${Math.round(ref.time)} Hrs</p>
                </div>
              </div>
            `;
            return tooltipContent;
          },
        },
        chart: {
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false
          }
        },
      },
      series: [
        {
          name: "Hrs",
          data: timeSpent,
        },
      ],

    };
  }, [timeSpent, weeklySummary, activeOrganization]);

  useEffect(() => {
    setChartData(state);
  }, [state]);

  return (
    chartData && (
      <div className='bg-white px-5 pt-5 my-3 rounded-md'>
        <p className='text-xl font-medium mt-1'>Weekly Summary (Active Time)</p>
        <div
          style={{ width: "100%" }}
          className='bg-white w-full'>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type='line'
            width={"100%"}
            height={400}
          />
        </div>
      </div>
    )
  );
}
