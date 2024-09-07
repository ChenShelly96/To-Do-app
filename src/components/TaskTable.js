import React, { useEffect, useState } from 'react';
import '../App.css';
import '../styles/TaskTable.css';
import { calculateTaskCompletionRate } from '../utils/Functions';
import ProgressBar from './ProgressBar';
import TaskActionPopup from './TaskActionPopup';
import TaskRow from './TaskRow';

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskCompletionRate, setTaskCompletionRate] = useState(0);


  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const fetchTasksFromLocalStorage = () => {
      try {
        // Load tasks from localStorage
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (Array.isArray(savedTasks)) {
          setTasks(savedTasks);
          console.log(calculateTaskCompletionRate(savedTasks));
          setTaskCompletionRate(calculateTaskCompletionRate(savedTasks));
        } else {
          console.error('Expected an array but got:', typeof savedTasks);
        }
      } catch (error) {
        console.error('Failed to fetch tasks from localStorage:', error);
      }
    };
    fetchTasksFromLocalStorage();
  }, []);

  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Save updated tasks to localStorage
  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setTaskCompletionRate(calculateTaskCompletionRate(updatedTasks));
  };

  // Add a new task
  const addTask = () => {
    const now = formatDateTime(new Date());
    const newTask = {
      id: tasks.length + 1,
      name: `Task ${tasks.length + 1}`,
      owner: 'CurrentUser',  // Replace with the current user's name
      status: 'Not Started',
      dueDate: '',
      priority: 'Low',
      notes: '',
      timeline: '',
      location: '',
      lastUpdated: now, 
      startTime: now,
      endTime: null,
    };

    const updatedTasks = [...tasks, newTask];
    saveTasksToLocalStorage(updatedTasks);
  };

  // Update an existing task
  const updateTask = (id, updatedTask) => {
    const now = formatDateTime(new Date()); // Current date and time as YYYY-MM-DD HH:MM
    updatedTask.lastUpdated = now;

    if (updatedTask.status === 'Done' && !updatedTask.endTime) {
      updatedTask.endTime = now; 
    }

    const updatedTasks = tasks.map(task =>
      task.id === id ? updatedTask : task
    );
    saveTasksToLocalStorage(updatedTasks);
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasksToLocalStorage(updatedTasks);
    setSelectedTask(null);
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handlePopupClose = () => {
    setSelectedTask(null);
  };

  return (
    <div className="task-table">
      <div className="TableTask-progress-bar-container">
        <h3>Task Completion Rate</h3>
        <ProgressBar value={taskCompletionRate} />
      </div>
      <div className="todo">
        <h2>To-Do</h2>
      </div>
      <div className="task-section to-do">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Task</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Due date</th>
              <th>Priority</th>
              <th>Notes</th>
              <th>Timeline</th>
              <th>Last updated</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 && tasks.filter(task => task.status !== 'Done').map(task => (
              <TaskRow
                key={task.id}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
                onTaskSelect={handleTaskSelect}
              />
            ))}
            <tr>
              <td colSpan="9">
                <button className="add-task-button" onClick={addTask}>+ Add task</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="completed">
        <h2>Completed</h2>
      </div>
      <div className="task-section completed">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Task</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Due date</th>
              <th>Priority</th>
              <th>Notes</th>
              <th>Timeline</th>
              <th>Last updated</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 && tasks.filter(task => task.status === 'Done').map(task => (
              <TaskRow
                key={task.id}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
                onTaskSelect={handleTaskSelect}
              />
            ))}
          </tbody>
        </table>
      </div>
      {selectedTask && (
        <TaskActionPopup
          selectedTask={selectedTask}
          onDelete={() => deleteTask(selectedTask.id)}
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
};

export default TaskTable;
