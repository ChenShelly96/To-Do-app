// src/components/TaskActionPopup.js
import React from 'react';
import '../App.css';
import '../styles/TaskActionPopup.css';

const TaskActionPopup = ({ selectedTask, onDelete, onClose }) => {
  return (
    <div className="task-action-popup">
      <div className="popup-content">
        <div className="task-info">
          <span>{`Task selected: ${selectedTask.name}`}</span>
        </div>
        <div className="task-actions">
          <button onClick={onDelete}>Delete</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default TaskActionPopup;
