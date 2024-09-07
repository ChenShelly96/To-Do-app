import React, { useState } from 'react';
import '../App.css';
import '../styles/TaskRow.css';
import { calculateLastUpdated } from '../utils/Functions';

const TaskRow = ({ task, updateTask, deleteTask, onTaskSelect }) => {
  const [editableTask, setEditableTask] = useState(task);
  const [location, setLocation] = useState(task.location || "");
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle input change for any field and update task in localStorage
  const handleChange = (field, value) => {
    const now = new Date().toISOString(); // Get current date and time
    const updatedTask = { ...editableTask, [field]: value, lastUpdated: now };
    setEditableTask(updatedTask);

    // Update task in parent component and localStorage
    updateTask(editableTask.id, updatedTask);
    updateTaskInLocalStorage(editableTask.id, updatedTask);
  };

  // Update the task in localStorage
  const updateTaskInLocalStorage = (id, updatedTask) => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = savedTasks.map(task => task.id === id ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // Save updated tasks back to localStorage
  };

  const handleLocationChange = (newCity) => {
    setLocation(newCity);
    handleChange('location', newCity);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    onTaskSelect(e.target.checked ? task : null);
  };

  return (
    <tr className="task-row">
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>
        <input
          type="text"
          value={editableTask.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </td>
      <td><span className="avatar">{editableTask.owner}</span></td>
      <td className={`status ${editableTask.status ? editableTask.status.replace(/ /g, '-') : ''}`}>
        <select
          value={editableTask.status || 'Not Started'} // Default value in case status is undefined
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option value="Not Started">Not Started</option>
          <option value="Working on it">Working on it</option>
          <option value="Done">Done</option>
          <option value="Stuck">Stuck</option>
        </select>
      </td>
      <td>
        <input
          type="date"
          value={editableTask.dueDate || ''} // Default empty value if dueDate is undefined
          onChange={(e) => handleChange('dueDate', e.target.value)}
        />
      </td>
      <td className={`priority ${editableTask.priority || 'Low'}`}>
        <select
          value={editableTask.priority || 'Low'} // Default value in case priority is undefined
          onChange={(e) => handleChange('priority', e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </td>
      <td>
        <input
          type="text"
          value={editableTask.notes || ''} // Default empty value if notes are undefined
          onChange={(e) => handleChange('notes', e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={editableTask.timeline || ''} // Default empty value if timeline is undefined
          onChange={(e) => handleChange('timeline', e.target.value)}
        />
      </td>
      <td>{editableTask.lastUpdated ? calculateLastUpdated(editableTask.lastUpdated) : 'N/A'}</td>
      <td>
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
        />
      </td>
    </tr>
  );
};

export default TaskRow;
