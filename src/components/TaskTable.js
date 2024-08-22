import axios from 'axios'; // Import axios for making API requests
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
        const tasks = response.data;
        setTasks(tasks);
        setTaskCompletionRate(calculateTaskCompletionRate(tasks));
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    const now = new Date().toISOString().split('T')[0]; // Current date as YYYY-MM-DD
    const newTask = {
      name: `Task ${tasks.length + 1}`,
      owner: 'CurrentUser',  // Replace with the current user's name
      status: 'Not Started',
      dueDate: '',
      priority: 'Low',
      notes: '',
      timeline: '',
      location: '',
      lastUpdated: now,  // Set the current date as the last updated date
    };

    try {
      const response = await axios.post('/api/tasks', newTask);
      const savedTask = response.data;
      setTasks([...tasks, savedTask]);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  // Update an existing task
  const updateTask = async (id, updatedTask) => {
    const now = new Date().toISOString().split('T')[0]; // Current date as YYYY-MM-DD
    updatedTask.lastUpdated = now;

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
            {tasks.filter(task => task.status !== 'Done').map(task => (
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
            {tasks.filter(task => task.status === 'Done').map(task => (
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
