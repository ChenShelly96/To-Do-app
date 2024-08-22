// src/utils/Functions.js


export const calculateTaskCompletionRate = (tasks) => {
    if (tasks.length === 0) return 0; // Handle the case where there are no tasks
    const completedTasks = tasks.filter(task => task.status === 'Done').length;
    return (completedTasks / tasks.length) * 100;
  };
  
// Calculate the time since the task was last updated
export const calculateLastUpdated = (previousDate) => {
    const now = new Date();
    const previous = new Date(previousDate);
    const timeDifference = Math.abs(now - previous);

    // Calculate the difference in days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Return a formatted string based on the days difference
    if (daysDifference === 0) {
        return "Today";
    } else if (daysDifference === 1) {
        return "Yesterday";
    } else {
        return `${daysDifference} days ago`;
    }
};

export const calculateDailyWorkHours = (tasks) => {
    
    const workHours = Array(7).fill(0);
    
    tasks.forEach(task => {
      const taskDay = new Date(task.dueDate).getDay(); 
      const taskHours = Math.min(10, task.hours || 0); 
      workHours[taskDay] += taskHours;
    });
  console.log(workHours);
    return workHours;
  };