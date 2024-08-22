import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import '../styles/ProductivityPage.css';

const WorkHoursChart = () => {
  const [workHoursData, setWorkHoursData] = useState([]);

  useEffect(() => {
    const fetchWorkHours = async () => {
      try {
        const response = await axios.get('/api/tasks');
        const tasks = response.data;

        // Calculate work hours per day
        const workHoursPerDay = calculateWorkHoursPerDay(tasks);
        const data = [
          { day: 'Sunday', hours: workHoursPerDay[0] },
          { day: 'Monday', hours: workHoursPerDay[1] },
          { day: 'Tuesday', hours: workHoursPerDay[2] },
          { day: 'Wednesday', hours: workHoursPerDay[3] },
          { day: 'Thursday', hours: workHoursPerDay[4] },
          { day: 'Friday', hours: workHoursPerDay[5] },
          { day: 'Saturday', hours: workHoursPerDay[6] },
        ];

        setWorkHoursData(data);
      } catch (error) {
        console.error('Failed to fetch work hours:', error);
      }
    };

    fetchWorkHours();
  }, []);

  const calculateWorkHoursPerDay = (tasks) => {
    const hoursPerDay = [0, 0, 0, 0, 0, 0, 0];
    tasks.forEach(task => {
      const dayOfWeek = new Date(task.lastUpdated).getDay();
      const hoursWorked = task.hours || 0; // Assumes `task.hours` contains the number of hours worked on that task
      hoursPerDay[dayOfWeek] += hoursWorked;
    });
    return hoursPerDay;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={workHoursData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="day" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="hours" stroke="#f5f5f5" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WorkHoursChart;
