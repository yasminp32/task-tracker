const express = require('express');
const router = express.Router();
const { createProject, getUserProjects, getProject } = require('../controller/projectController');
const { createTask, getProjectTasks, updateTask, deleteTask } = require('../controller/taskController');
const isLoggedIn = require('../middleware/isLoggendIn');

// Project routes
router.post('/create', isLoggedIn, createProject);
router.get('/user-projects', isLoggedIn, getUserProjects);
router.get('/:id', isLoggedIn, getProject);

// Task routes within projects
router.route('/tasks')
    .post(isLoggedIn, createTask)
    .get(isLoggedIn, getProjectTasks)
    .put(isLoggedIn, updateTask)
    .delete(isLoggedIn, deleteTask);

module.exports = router;
