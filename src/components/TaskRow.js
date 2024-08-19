// src/components/TaskRow.js
import React, { useState } from 'react';
import '../App.css';
import '../styles/TaskRow.css';

const TaskRow = ({ task, updateTask }) => {
  const [editableTask, setEditableTask] = useState(task);
  const [location, setLocation] = useState(task.location || "");

  // Function to handle status change
  const handleStatusChange = () => {
    const newStatus = editableTask.status === 'Done' ? 'Working on it' : 'Done';
    handleChange('status', newStatus);
  };

  // Function to handle input change for any field
  const handleChange = (field, value) => {
    const updatedTask = { ...editableTask, [field]: value };
    setEditableTask(updatedTask);
    updateTask(task.id, updatedTask);
  };

  // Function to handle location change
  const handleLocationChange = (newCity) => {
    setLocation(newCity); // Update the local state
    handleChange('location', newCity); // Update the task's location
  };

  return (
    <tr className="task-row">
      <td><input type="checkbox" /></td>
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
          type="number"
          value={editableTask.budget}
          onChange={(e) => handleChange('budget', e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={editableTask.timeline}
          onChange={(e) => handleChange('timeline', e.target.value)}
        />
      </td>
      <td>44 minutes ago</td>
  
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
