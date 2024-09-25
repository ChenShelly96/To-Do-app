import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import '../styles/ProductivityPage.css';
//import '../styles/TaskTable.css';
const WorkHoursChart = () => {
  const [workHoursData, setWorkHoursData] = useState([]);
  //const [categories, setCategories] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  const categories = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    const fetchWorkHours = () => {
      try {
        // Generate random work hours for each day of the week (Sunday to Saturday)
        const randomWorkHours = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10) + 1);
        setWorkHoursData(randomWorkHours);
      } catch (error) {
        console.error('Failed to fetch work hours:', error);
      }
    };

    fetchWorkHours();
  }, []);

  const chartOptions = {
    chart: {
      id: 'work-hours-chart',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: ['#fff'],
          fontSize: '16px',
        }
      },
      tickAmount: 6,
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#fff'],
          fontSize: '16px',
        },
        formatter: function (val) {
          return Math.round(val);
        }
      },
      min: 0,
      max: 10,
      tickAmount: 10,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#4CAF50'],
    markers: {
      size: 5,
      colors: ['#4CAF50'],
      strokeColors: '#fff',
      strokeWidth: 2,
    },
    tooltip: {
      theme: 'dark'
    }
  };

  const chartSeries = [
    {
      name: 'Hours Worked',
      data: workHoursData
    }
  ];

  return (
    <div className="chart-container">
      <Chart 
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={400}
        width="100%"
      />
    </div>
  );
};

export default WorkHoursChart;
