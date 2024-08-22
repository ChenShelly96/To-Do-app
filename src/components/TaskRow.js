import axios from 'axios';
import React, { useState } from 'react';
import '../App.css';
import '../styles/TaskRow.css';
import { calculateLastUpdated } from '../utils/Functions';

const TaskRow = ({ task, updateTask, deleteTask, onTaskSelect }) => {
  const [editableTask, setEditableTask] = useState(task);
  const [location, setLocation] = useState(task.location || "");
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle input change for any field and send API update request
  const handleChange = async (field, value) => {
    const now = new Date().toISOString(); // Get current date and time
    const updatedTask = { ...editableTask, [field]: value, lastUpdated: now };
    setEditableTask(updatedTask);

    try {
      await axios.put(`/api/tasks/${editableTask.id}`, updatedTask);
      updateTask(editableTask.id, updatedTask); // Update the task in the parent component
    } catch (error) {
      console.error('Failed to update task:', error);
    }
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
      <td className={`status ${editableTask.status.replace(/ /g, '-')}`}>
        <select
          value={editableTask.status}
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
          value={editableTask.dueDate}
          onChange={(e) => handleChange('dueDate', e.target.value)}
        />
      </td>
      <td className={`priority ${editableTask.priority}`}>
        <select
          value={editableTask.priority}
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
          value={editableTask.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={editableTask.timeline}
          onChange={(e) => handleChange('timeline', e.target.value)}
        />
      </td>
      <td>{calculateLastUpdated(editableTask.lastUpdated)}</td>
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
