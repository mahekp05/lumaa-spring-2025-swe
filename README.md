# Task Management App (React + Node.js + PostgreSQL)
This is a Task Management application built using React + TypeScript (frontend), Node.js (backend), and PostgreSQL (database).
The app allows users to register, log in, create, update, delete, and view their tasks.

## Features
- User Authentication: Register & Log in users.
- Task Management: Users can create, update, delete, and list their tasks.
- Secure API: Uses JWT authentication for secure access.
- Database: PostgreSQL for data storage.
- Frontend: Built using React + TypeScript.

## Setup Instructions
1. Clone the Repository
`git clone <your-forked-repository-url>`
`cd task-manager`

2. Backend Setup

    ***Install dependencies:***

        `cd task-manager-backend`

        `npm install express pg sequelize sequelize-cli dotenv cors bcrypt jsonwebtoken nodemon`

        `npm install`

    ***Set Up Environment Variables:***

        Create a '.env' file in the backend/ directory and add:

        `PORT=5000`

        `DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/taskmanager`

        `JWT_SECRET=your_secret_key`
        
    Change it according to your password and secret key

    ***Set Up Database:***

    Ensure **PostgreSql** is running on your system. Then run,

        `psql -U postgres -c "CREATE DATABASE taskmanager;"`

    Database Migrations
        
        `npx sequelize-cli db:migrate`

3. Start Backend server:
        `npm start`


## Frontend Setup (React + TypeScript)

*** Install Frontend Dependencies: ***

For react: 
`npm install react react-dom react-router-dom axios @mui/material @mui/icons-material @emotion/react @emotion/styled`

For typescript:
`npm install --save-dev @types/react @types/react-dom @types/react-router-dom @types/node @types/axios`

To run:
`cd task-manager-frontend`
`npm install`

`npm start`

# Use Postman or cURL to test backend API test points:

**Register a user:**

    curl -X POST http://localhost:5000/auth/register -H "Content-Type: application/json" -d '{"username":"testuser","password":"password"}'
    
**Login and get a token**

    curl -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d '{"username":"testuser","password":"password"}'

**Copy the token and include it in all subsequent requests:
**
**Create a task:
**
    curl -X POST http://localhost:5000/tasks -H "Authorization: Bearer YOUR_TOKEN_HERE" -H "Content-Type: application/json" -d '{"title":"Finish project","description":"Complete the task manager app"}'


### Salary Expectations: $5000
