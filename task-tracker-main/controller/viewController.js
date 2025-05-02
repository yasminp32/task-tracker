const User = require('../models/user');

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.getSignupPage = (req, res) => {
    res.render('signup');
};

exports.getDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'projects',
            populate: {
                path: 'tasks',
                model: 'task'
            }
        });

        res.render('dashboard', {
            user: user,
            projects: user.projects
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};
