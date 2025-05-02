# Task Tracker Application

A full-stack task management application built with Node.js, Express, EJS, and MongoDB. This application allows users to manage projects and tasks with a clean, user-friendly interface.

## Features

- **User Authentication**
  - Secure signup and login with JWT
  - Cookie-based authentication
  - Protected routes

- **Project Management**
  - Create up to 4 projects per user
  - View all projects in a dashboard
  - Project details and progress tracking

- **Task Management**
  - Create, read, update, and delete tasks
  - Track task progress
  - Organize tasks by project
  - Task description and status management

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

### Frontend
- EJS templating engine
- Bootstrap for styling
- JavaScript for interactivity

### Security
- bcrypt for password hashing
- HTTP-only cookies
- JWT token authentication

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-tracker.git
   cd task-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8001
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the application:
   ```bash
   npm start
   ```

The application will be available at http://localhost:8001

## Project Structure
```
task-tracker/
├── controller/         # Route controllers
├── middleware/        # Custom middleware
├── models/            # MongoDB models
├── public/            # Static files
├── router/           # Route definitions
├── utils/            # Utility functions
├── views/            # EJS templates
└── index.js          # Application entry point
```

## API Endpoints

### Authentication
- `POST /api/v1/signup` - User registration
- `POST /api/v1/login` - User login
- `GET /api/v1/logout` - User logout

### Projects
- `POST /api/v1/projects` - Create a new project
- `GET /api/v1/projects` - Get all user projects

### Tasks
- `POST /api/v1/tasks` - Create a new task
- `GET /api/v1/tasks` - Get all tasks
- `PUT /api/v1/tasks/` - Update a task
- `DELETE /api/v1/tasks/` - Delete a task

