import axios from 'axios';
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

  // Load tasks from API when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        const tasks = response.data.tasksList || response.data; 
        console.log(tasks);
        if (Array.isArray(tasks)) {
          setTasks(tasks);
          console.log(calculateTaskCompletionRate(tasks));
          setTaskCompletionRate(calculateTaskCompletionRate(tasks));
        } else {
          console.error('Expected an array but got!!!:', typeof tasks);
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Add a new task
  const addTask = async () => {
    const now = formatDateTime(new Date());
    const newTask = {
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

    try {
      const response = await axios.post('/api/tasks', newTask);
      const savedTask = response.data;
      console.log(savedTask);
      setTasks([...tasks, savedTask]);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  // Update an existing task
  const updateTask = async (id, updatedTask) => {
    const now = formatDateTime(new Date()); // Current date and time as YYYY-MM-DD HH:MM
    updatedTask.lastUpdated = now;

    if (updatedTask.status === 'Done' && !updatedTask.endTime) {
      updatedTask.endTime = now; 
    }

    try {
      const response = await axios.put(`/api/tasks/${id}`, updatedTask);
      const savedTask = response.data;
      const updatedTasks = tasks.map(task =>
        task.id === id ? savedTask : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      setSelectedTask(null);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
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
