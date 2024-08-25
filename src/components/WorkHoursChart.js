import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import '../styles/ProductivityPage.css';
import { formatDateTime } from '../utils/Functions';
const WorkHoursChart = () => {
  const [workHoursData, setWorkHoursData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchWorkHours = async () => {
      try {
        const response = await axios.get('/api/tasks');
        const tasks = response.data;
        console.log(tasks);
        if (Array.isArray(tasks)) {
          // Filter tasks that have an endTime
          const tasksWithEndTime = tasks.filter(task => task.endTime !== null);
          
          // Calculate work hours per day and scale to 1-10
          const workHoursPerDay = calculateWorkHoursPerDay(tasksWithEndTime);
          const maxHours = Math.max(...Object.values(workHoursPerDay)); // Find the maximum work hours in any day
          const scaledWorkHours = Object.values(workHoursPerDay).map(hours => (hours / maxHours) * 10); // Scale to 1-10

         
          const categoriesData = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


          setWorkHoursData(scaledWorkHours);
          setCategories(categoriesData);
        } else {
          console.error('Expected tasks data to be an array, but got:', typeof tasks);
        }
      } catch (error) {
        console.error('Failed to fetch work hours:', error);
      }
    };

    fetchWorkHours();
  }, []);

  const calculateWorkHoursPerDay = (tasks) => {
    const hoursPerDay = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    tasks.forEach(task => {
      if (task.startTime && task.endTime) {
        const startTime = new Date(formatDateTime(new Date(task.startTime))); 
        const endTime = new Date(formatDateTime(new Date(task.endTime)));
        let hoursWorked = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours
     
        if (hoursWorked < 1) {
            hoursWorked = 1;
          }
        const dayOfWeek = startTime.getDay();
        hoursPerDay[dayOfWeek] += hoursWorked;
      }
     
    });

    
    return hoursPerDay;
  };

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
          fontSize: '20px',
        }
      },
      tickAmount: 6, 
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#fff'],
          fontSize: '20px',
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
    colors: ['#EE891B'],
    markers: {
      size: 5,
      colors: ['#EE891B'],
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
        height={600}
        width="100%"
      />
    </div>
  );
};

export default WorkHoursChart;
