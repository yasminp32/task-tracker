const User = require("../models/user");
const cookieToken = require('../utils/cookieToken')
const bcrypt = require('bcrypt')

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password, country } = req.body;

        if (!name || !email || !password) {
            return res.status(400).render('signup', { 
                error: "Name, email or password fields are required" 
            });
        }

        const user = await User.create({ name, email, password, country});
        cookieToken(user, res);
    }
    catch (error) {
        res.status(500).render('signup', { 
            error: "Error while signing up: " + error.message 
        });
    }
};


exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', { 
                error: "Email or password fields are required" 
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).render('login', { 
                error: "Invalid email or password" 
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).render('login', { 
                error: "Invalid email or password" 
            });
        }

        cookieToken(user, res);
    }
    catch (error) {
        res.status(500).render('login', { 
            error: "Error while logging in: " + error.message 
        });
    }
};


exports.logout = async(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.redirect('/login');
};