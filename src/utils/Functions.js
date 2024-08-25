export const calculateTaskCompletionRate = (tasks) => {
    if (!Array.isArray(tasks) || tasks.length === 0) return 0; // Handle the case where there are no tasks or tasks is not an array
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
      if (task.startTime && task.endTime) {
        const startTime = new Date(task.startTime);
        const endTime = new Date(task.endTime);
        const taskDay = startTime.getDay();
        const hoursWorked = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours
        workHours[taskDay] += hoursWorked;
      }
    });
  
    console.log(workHours);
    return workHours;
  };

  export const formatDateTime = (date) =>{
    const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  