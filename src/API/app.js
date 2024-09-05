const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const tasksFilePath = path.join(__dirname, 'tasks.json');
const myDayFilePath = path.join(__dirname, 'myday.json');

// Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
app.use(cors());
app.use(express.json());

// Helper functions to read and write the JSON file for tasks
function readTasksFromFile() {
    try {
        const data = fs.readFileSync(tasksFilePath, 'utf8');
        const tasks = JSON.parse(data);
        return tasks.tasksList ? tasks : { tasksList: [] }; 
    } catch (error) {
        console.error("Error reading tasks file:", error);
        return { tasksList: [] }; 
    }
}

function writeTasksToFile(tasks) {
    try {
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing tasks to file:', error);
    }
}

// Helper functions to read and write the JSON file for MyDay
function readMyDayFromFile() {
    try {
        // If the file does not exist, create an empty file
        if (!fs.existsSync(myDayFilePath)) {
            const initialData = { tasks: [], completedTasks: [] };
            fs.writeFileSync(myDayFilePath, JSON.stringify(initialData, null, 2), 'utf8');
            return initialData;
        }

        const data = fs.readFileSync(myDayFilePath, 'utf8');
        const myDay = JSON.parse(data);
        console.log(data);
        return myDay.tasks ? myDay : { tasks: [], completedTasks: [] };
    } catch (error) {
        console.error("Error reading MyDay file:", error);
        return { tasks: [], completedTasks: [] };
    }
}

function writeMyDayToFile(myDay) {
    try {
        fs.writeFileSync(myDayFilePath, JSON.stringify(myDay, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing MyDay to file:', error);
    }
}

// Routes for tasks
app.get(`/api/tasks`, (req, res) => {
    const tasks = readTasksFromFile();
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const tasks = readTasksFromFile();
    
    const newTask = { 
        id: tasks.tasksList.length ? tasks.tasksList[tasks.tasksList.length - 1].id + 1 : 1, 
        ...req.body 
    };

    tasks.tasksList.push(newTask);
    
    writeTasksToFile(tasks);

    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const tasks = readTasksFromFile();
    const taskIndex = tasks.tasksList.findIndex(task => task.id === parseInt(req.params.id));
    if (taskIndex !== -1) {
        tasks.tasksList[taskIndex] = { ...tasks.tasksList[taskIndex], ...req.body };
        writeTasksToFile(tasks);
        res.json(tasks.tasksList[taskIndex]);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

app.delete('/api/tasks/:id', (req, res) => {
    let tasks = readTasksFromFile();
    tasks.tasksList = tasks.tasksList.filter(task => task.id !== parseInt(req.params.id));
    writeTasksToFile(tasks);
    res.status(204).end();
});

// Routes for MyDay
app.get('/api/myday', (req, res) => {
    const myDay = readMyDayFromFile();
    res.json(myDay);
});

app.post('/api/myday', (req, res) => {
    const myDay = readMyDayFromFile();
    const { tasks, completedTasks } = req.body;

    // Update tasks and completedTasks in the MyDay file
    myDay.tasks = tasks || [];
    myDay.completedTasks = completedTasks || [];
    
    writeMyDayToFile(myDay);

    res.status(201).json({ message: 'MyDay updated successfully' });
});

// Start the server
const PORT = process.env.PORT || 5000;
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';  
app.listen(PORT, () => console.log(`Server running on port ${PORT} and API URL is ${API_BASE_URL}`));
