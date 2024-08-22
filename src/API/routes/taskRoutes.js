const express = require('express');
const Task = require('../models/task'); // Ensure you have a Task model

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const task = await newTask.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT update a task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
