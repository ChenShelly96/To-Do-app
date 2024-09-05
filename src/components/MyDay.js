import React, { useState } from 'react';
import '../styles/MyDay.css';

const MyDay = () => {
  const [isInputVisible, setIsInputVisible] = useState(false); // State to track if input is visible
  const [task, setTask] = useState(''); // State to store the user's input

  // Function to handle button click and show the input
  const handleAddTaskClick = () => {
    setIsInputVisible(true);
  };

  // Function to handle input change
  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  // Function to handle task submission
  const handleTaskSubmit = () => {
    if (task.trim()) {
      console.log('Task added:', task);
      // Here you can add logic to save the task
      setIsInputVisible(false);
      setTask('');
    }
  };

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
          {isInputVisible ? (
            <div className="task-input-box">
              <input
                type="text"
                placeholder="Add Task"
                value={task}
                onChange={handleTaskChange}
                className="task-input"
              />
              <button className="task-submit-button" onClick={handleTaskSubmit}>
                ✓
              </button>
            </div>
          ) : (
            <button className="add-task-button" onClick={handleAddTaskClick}>
              + Add a task
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDay;
