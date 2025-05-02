const Task = require('../models/task');
const Project = require('../models/project').ProjectModel;

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const projectId = req.body.projectId;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        const task = await Task.create({
            name: req.body.name,
            description: req.body.description,
            progress: 'Not Started',
            project: projectId
        });

        // Add task to project's tasks array
        project.tasks.push(task._id);
        await project.save();

        res.status(201).json({
            success: true,
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all tasks for a project
exports.getProjectTasks = async (req, res) => {
    try {
        const {projectId} = req.body;
        console.log(projectId)
        const tasks = await Task.find({ project: projectId });
        console.log(tasks)
        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update task
exports.updateTask = async (req, res) => {
    try {
        const {id} = req.body
        const task = await Task.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        const {id} = req.body
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Remove task from project's tasks array
        const project = await Project.findById(task.project);
        if (project) {
            project.tasks = project.tasks.filter(t => t.toString() !== id);
            await project.save();
        }

        await Task.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};