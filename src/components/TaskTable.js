// src/components/TaskTable.js
import React, { useState } from 'react';
import '../styles/TaskTable.css';
import TaskRow from './TaskRow';

const TaskTable = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', owner: 'CS', status: 'Working on it', dueDate: '2024-08-13', priority: 'Low', notes: 'Action items', budget: '$100', timeline: '13 - 14 Aug' },
    { id: 2, name: 'Task 2', owner: 'User2', status: 'Done', dueDate: '2024-08-14', priority: 'High', notes: 'Meeting notes', budget: '$1,000', timeline: '15 - 16 Aug' },
    { id: 3, name: 'Task 3', owner: 'User3', status: 'Stuck', dueDate: '2024-08-15', priority: 'Medium', notes: 'Other', budget: '$500', timeline: '17 - 18 Aug' },
  ]);

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      name: `Task ${tasks.length + 1}`,
      owner: 'New User',
      status: 'Working on it',
      dueDate: '2024-08-20',
      priority: 'Low',
      notes: 'New Task',
      budget: '$200',
      timeline: '20 - 21 Aug',
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map(task => (task.id === id ? updatedTask : task));
    setTasks(updatedTasks);
  };

  return (
    <div className="task-table">
      <div className="task-section to-do">
        <h2>To-Do</h2>
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
              <th>Budget</th>
              <th>Timeline</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {tasks.filter(task => task.status !== 'Done').map(task => (
              <TaskRow key={task.id} task={task} updateTask={updateTask} />
            ))}
            <tr>
              <td colSpan="10">
                <button className="add-task-button" onClick={addTask}>+ Add task</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="task-section completed">
        <h2>Completed</h2>
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
              <th>Budget</th>
              <th>Timeline</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {tasks.filter(task => task.status === 'Done').map(task => (
              <TaskRow key={task.id} task={task} updateTask={updateTask} />
            ))}
            <tr>
              <td colSpan="10">
                <button className="add-task-button" onClick={addTask}>+ Add task</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
