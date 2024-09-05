import axios from 'axios'; // ייבוא axios
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';
import '../styles/MyDay.css';
import Sidebar from './Sidebar';
const MyDay = () => {
  const [isInputVisible, setIsInputVisible] = useState(true); // State to track if input is visible
  const [task, setTask] = useState(''); // State to store the user's input
  const [tasks, setTasks] = useState([]); // State to store the list of tasks
  const [completedTasks, setCompletedTasks] = useState([]); // State for completed tasks
  const [startDate, setStartDate] = useState(new Date()); // State for the selected date
  const [selectedTask, setSelectedTask] = useState(null); // Selected task for side panel
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // State to show/hide calendar
  const [sidePanelVisible, setSidePanelVisible] = useState(false); // State to show/hide side panel

  useEffect(() => {
    // Fetch existing tasks from the API on load
    fetchTasksFromAPI();
  }, []);

  // Function to fetch tasks from API using axios
  const fetchTasksFromAPI = async () => {
    try {
      const response = await axios.get('/api/myday'); 
      const data = response.data;
      setTasks(data.tasks || []);
      setCompletedTasks(data.completedTasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Function to save tasks to API using axios
  const saveTasksToAPI = async (tasksToSave, completedTasksToSave) => {
    try {
      const response = await axios.post('/api/myday', {
        tasks: tasksToSave,
        completedTasks: completedTasksToSave
      }); 
      console.log('Tasks saved successfully',response);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  // Function to handle task submission
  const handleTaskSubmit = () => {
    if (task.trim()) {
      const newTask = {
        title: task,
        date: startDate,
        important: false,
        notes: '',
        location: '',
        status: 'pending'
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setIsInputVisible(false);
      setTask('');
      // Save updated tasks to API
      saveTasksToAPI(updatedTasks, completedTasks);
    }
  };

  // Function to toggle calendar visibility
  const handleCalendarClick = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  // Function to handle task click and open side panel
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setSidePanelVisible(true);
  };

  // Function to update task details in the side panel
  const handleTaskUpdate = (field, value) => {
    const updatedTask = { ...selectedTask, [field]: value };
    setSelectedTask(updatedTask);
    const updatedTasks = tasks.map((t) => (t === selectedTask ? updatedTask : t));
    setTasks(updatedTasks);
    // Save updated tasks to API
    saveTasksToAPI(updatedTasks, completedTasks);
  };

  // Function to mark task as completed
  const markTaskAsCompleted = (task) => {
    const updatedTasks = tasks.filter((t) => t !== task);
    const updatedCompletedTasks = [...completedTasks, { ...task, status: 'done' }];
    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
    setSidePanelVisible(false);
    // Save updated tasks to API
    saveTasksToAPI(updatedTasks, updatedCompletedTasks);
  };

   // Function to handle Add Task button click to show the input
   const handleAddTaskClick = () => {
    setIsInputVisible(true);
  };

  return (
    <div className="my-day-container">
             <Sidebar className="sidebar" />
      <header className="my-day-header">
        <h1>My Day</h1>
        <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </header>

      <div className="my-day-content">
        <div className="my-day-message">
          <h2>Ready to make the most of your day?</h2>
          <p>Add your tasks for today, and let us help you stay organized and productive.</p>
        </div>

        <div className="my-day-add-task">
          {isInputVisible ? (
            <div className="task-input-box">
              <input
                type="text"
                placeholder="Add Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="task-input"
              />
              {/* Calendar Button */}
              <button className="calendar-button" onClick={handleCalendarClick}>
                📅
              </button>
              {/* Save new task Button */}
              <button className="task-submit-button" onClick={handleTaskSubmit}>
                ✓
              </button>
            </div>
          ) : (
            <button className="add-task-button" onClick={handleAddTaskClick}>
              + Add a task
            </button>
          )}

          {isCalendarVisible && (
            <div className="calendar-popup">
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline />
            </div>
          )}
        </div>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item" onClick={() => handleTaskClick(task)}>
              <div className="task-box">
                <p>{task.title}</p>
              </div>
            </li>
          ))}
        </ul>

       
        {sidePanelVisible && selectedTask && (
            <div className="side-panel">
                <h3>{selectedTask.title}</h3>
                <p>Added to My Day</p>
                <div className="side-panel-controls">
                <label>Important:</label>
                <input
                    type="checkbox"
                    checked={selectedTask.important}
                    onChange={(e) => handleTaskUpdate('important', e.target.checked)}
                />
                <label>Due Date:</label>
                <DatePicker
                    selected={new Date(selectedTask.date)}
                    onChange={(date) => handleTaskUpdate('date', date)}
                />
                <label>Location:</label>
                <input
                    type="text"
                    value={selectedTask.location}
                    onChange={(e) => handleTaskUpdate('location', e.target.value)}
                />
                <label>Notes:</label>
                <textarea
                    value={selectedTask.notes}
                    onChange={(e) => handleTaskUpdate('notes', e.target.value)}
                />
                <button onClick={() => markTaskAsCompleted(selectedTask)}>Mark as Completed</button>
            </div>
        </div>
        )}
    </div>
    <div className='completed-box'>
                <h3>Completed</h3>
                <ul className="completed-task-list">
                {completedTasks.map((task, index) => (
                    <li key={index} className="task-item">
                    <div className="task-box">
                        <p>{task.title}</p>
                    </div>
                    </li>
                ))}
                </ul>
        </div>
</div>
  );
};

export default MyDay;
