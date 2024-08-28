import React from 'react';
import '../styles/MyDay.css';

const MyDay = () => {
  return (
    <div className="my-day-container">
      <header className="my-day-header">
        <h1>My Day</h1>
        <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </header>
      <div className="my-day-content">
        <div className="my-day-message">
          <h2>Wondering where your tasks are?</h2>
          <p>Any tasks you didn't complete in My Day last time show up in the suggestions pane.</p>
        </div>
        <div className="my-day-add-task">
          <button className="add-task-button">+ Add a task</button>
        </div>
      </div>
    </div>
  );
};

export default MyDay;
