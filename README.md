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
1. Download Repositary
2. Open Command Prompt
   `cd <path to application file>`

4. Backend Setup
      Ensure latest version of **Node.js** and **PostgreSql** are installed and running on your computer. Ensure they are    also added to your system's environmental variables. Then run on command prompt,
   
         `cd task-manager-backend`
   
         `npm install`
   
         `npm start`


## Frontend Setup (React + TypeScript)

*** Install Frontend Dependencies: ***
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


