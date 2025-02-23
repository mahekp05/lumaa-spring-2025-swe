const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Ensure all task routes require authentication
router.use(verifyToken);

// CRUD Routes for Tasks
router.post("/", createTask);   // Create Task
router.get("/", getTasks);      // Get All Tasks (For Logged-in User)
router.put("/:id", updateTask); // Update Task (PUT Route)
router.delete("/:id", deleteTask); // Delete Task

module.exports = router;
