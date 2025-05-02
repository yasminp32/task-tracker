const express = require('express');
const router = express.Router();
const { getLoginPage, getSignupPage, getDashboard } = require('../controller/viewController');
const isLoggedIn = require('../middleware/isLoggendIn');

router.get('/', isLoggedIn, getDashboard);
router.get('/login', getLoginPage);
router.get('/signup', getSignupPage);

module.exports = router;
