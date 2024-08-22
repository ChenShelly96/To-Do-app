const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const tasksFilePath = path.join(__dirname, 'tasks.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions to read and write the JSON file
function readTasksFromFile() {
  const data = fs.readFileSync(tasksFilePath, 'utf8');
  return JSON.parse(data);
}

function writeTasksToFile(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
}

// Routes
app.get('/api/tasks', (req, res) => {
  const tasks = readTasksFromFile();
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const tasks = readTasksFromFile();
  const newTask = { id: tasks.length + 1, ...req.body };
  tasks.push(newTask);
  writeTasksToFile(tasks);
  res.json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const tasks = readTasksFromFile();
  const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    writeTasksToFile(tasks);
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  let tasks = readTasksFromFile();
  tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
  writeTasksToFile(tasks);
  res.json({ success: true });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
