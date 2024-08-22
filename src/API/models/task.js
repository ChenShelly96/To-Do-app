const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Not Started', 'Working on it', 'Done', 'Stuck'],
        default: 'Not Started',
    },
    dueDate: {
        type: Date,
        required: false,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low',
    },
    notes: {
        type: String,
        required: false,
    },
    timeline: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
