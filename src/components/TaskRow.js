// src/components/TaskRow.js
import React from 'react';
import '../styles/TaskRow.css';

const TaskRow = ({ task, updateTask }) => {
  const handleStatusChange = () => {
    const newStatus = task.status === 'Done' ? 'Working on it' : 'Done';
    updateTask(task.id, { ...task, status: newStatus });
  };

  return (
    <tr className="task-row">
      <td><input type="checkbox" /></td>
      <td>{task.name}</td>
      <td><span className="avatar">{task.owner}</span></td>
      <td className={`status ${task.status.replace(/ /g, '-')}`}>
        <span onClick={handleStatusChange}>{task.status}</span>
      </td>
      <td>{task.dueDate}</td>
      <td className={`priority ${task.priority}`}>{task.priority}</td>
      <td>{task.notes}</td>
      <td>{task.budget}</td>
      <td>{task.timeline}</td>
      <td>44 minutes ago</td>
    </tr>
  );
};

export default TaskRow;
