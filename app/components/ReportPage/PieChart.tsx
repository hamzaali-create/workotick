import { useCallback, useEffect, useMemo, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import PeiChartTooltip from './PieChartTooltip';

const PieChartContainer = ({ data }) => {
  const { activeOrganization } = useSelector((state) => state.auth);
  const [dataset, setDataset] = useState([]);

   // Function to truncate long names
   const truncateName = (name, maxLength = 20) => {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  };

  // Modify data to include shortened names
  const modifiedData = useMemo(() => 
    data.map(item => ({
      ...item,
      name: truncateName(item.name)
    })), 
    [data]
  );

  const tooltipCB = useCallback(({ seriesIndex }) => {
   //console.log(modifiedData[seriesIndex])
    const contributor = modifiedData[seriesIndex];
    const detailsComponent = <PeiChartTooltip contributor={contributor ?? {}} timezone={activeOrganization.timezone} />;
    return renderToStaticMarkup(detailsComponent);
  }, [activeOrganization, modifiedData])

  const options = useMemo(() => (
    {
      chart: {
        type: 'pie',
      },
      colors: ['#1734b6', '#143fe1', '#1b54f5', '#3376ff', '#599bff', '#8ebfff', '#bcd8ff'],
      tooltip: {
        custom: tooltipCB,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        formatter: function (val) {
          const formattedValue = parseInt(val);
          return `${formattedValue}%`;
        },
        style: {
          fontSize: '24px',
          color: "#FFFFFF",
          margin: "40px"
        },
      },
    }
  ), [tooltipCB]);

  useEffect(() => {
    setDataset(data.map(item => item.percentage));
  }, [data]);


  return (
    <div className=''>
      <ReactApexChart options={options} series={dataset} type="pie" height={450} />
    </div>
  );
};

export default PieChartContainer;
