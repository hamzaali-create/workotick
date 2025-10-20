import { useCallback, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import Api from "../../utils/Axios";

const TopPerformersChart = ({ date }) => {

  const [chartData, setChartData] = useState({});
  const { activeOrganization } = useSelector((state) => state.auth);

  const getTopPerformers = useCallback(async () => {
    try {
      const { data } = await Api.Post(
        `/organization/${activeOrganization?.id}/team-report/top-performer`,
        {
          date: date.toISOString()
        }
      );

      // Shorten user names
    const shortenedData = {
      ...data,
      users: data.users.map(name =>
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
    getTopPerformers()
  }, [getTopPerformers])

  return (
    <div className='bg-white -mx-4 rounded-md'>
      <Chart
        options={{
          ...state.options,
        }}
        series={state.series}
        type='bar'
        width='100%'
        height={400}
      />
    </div>
  );
};

export default TopPerformersChart;
