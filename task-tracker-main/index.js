const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const db_connection = require("./config/db");
// DOTENV config
require('dotenv').config()

//Common middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Middleware
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// DB connection
db_connection();

// View Router
const viewRouter = require('./router/viewRouter');
app.use('/', viewRouter);

// API Routers
const userRouter = require("./router/userrouter");
const projectRouter = require("./router/projectRouter");

app.use("/api/v1", userRouter);
app.use("/api/v1/projects", projectRouter);
// PORT
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
