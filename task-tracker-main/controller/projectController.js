const Project = require('../models/project').ProjectModel;
const User = require('../models/user');

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        console.log(user)
        // Check if user already has 4 projects
        if (user.projects.length >= 4) {
            return res.status(400).json({
                success: false,
                message: "Maximum limit of 4 projects reached"
            });
        }

        const project = await Project.create({
            name: req.body.name,
        });
        console.log(project)
        // Add project to user's projects
        user.projects.push(project);
        await user.save();

        res.status(201).json({
            success: true,
            project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getUserProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate({
            path: 'projects',
            populate: {
                path: 'tasks',
                model: 'task'
            }
        });

        res.status(200).json({
            success: true,
            name: user.name,
            email: user.email,
            projects: user.projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single project
exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('tasks');
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
