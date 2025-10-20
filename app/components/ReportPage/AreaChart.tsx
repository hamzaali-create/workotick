import React from 'react';
import Chart from 'react-apexcharts';
import dot1 from "../../assets/dot1.svg";
import dot2 from "../../assets/dot2.svg";

export default function AreaChart() {
  const state = {
    options: {
      chart: {
        id: "basic-area", 
      },
      xaxis: {
        categories: ["10:00 am", "12:00 pm", "2:00 pm", "4:00 pm", "6:00 pm"],
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const tooltipContent = `
            <div class="arrow_box p-4 w-40">
              <h1 class="font-bold text-xs ml-3 mb-3">Monday, 12 Feb 2023</h1>
              <div class="flex justify-between text-xs font-semibold text-smtext">
                <img src=${dot1} alt="Dot 1" />
                <p>Clock in:</p>
                <p>10:00 AM</p>
              </div>
              <div class="flex justify-between text-xs font-semibold text-smtext">
                <img src=${dot2} alt="Dot 2" />
                <p>Clock out:</p>
                <p>7:00 PM</p>
              </div>
              <hr class="mt-3"/>
              <div class="flex justify-between text-xs font-semibold mt-1">
                <p>Total Availability</p>
                <p>${series[seriesIndex][dataPointIndex]} Hrs</p>
              </div>
              <span></span>
            </div>
          `;
          return tooltipContent;
        },
      },
    },
    series: [
      {
        name: "Hrs",
        data: [4, 2, 4, 1, 3], // Change data to numerical values
      },
    ],
  };

  return (
    <div className="bg-white px-5 pt-5 my-3 rounded-md">
      <p className="text-xl font-medium mt-1">Weekly Summary (Active Time)</p>
      <Chart
        options={state.options}
        series={state.series}
        type="area"  // Change the type to "area"
        height={400}
        width="100%"
      />
    </div>
  );
}
