const pool = require("../config/db");

// 🔹 Create a Task
const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user?.userId; // Extract user ID from token

  if (!title || !userId) {
    return res.status(400).json({ error: "Missing title or userId" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *",
      [title, description || "", userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Could not create task" });
  }
};

// 🔹 Get All Tasks (Only User's Tasks)
const getTasks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query("SELECT * FROM tasks WHERE userId = $1", [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch tasks" });
  }
};

// 🔹 Update Task Function
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  const userId = req.user.userId; // Ensure only the owner can update their task

  // Validate input: At least one field must be provided
  if (title === undefined && description === undefined && isComplete === undefined) {
    return res.status(400).json({ error: "No update fields provided" });
  }

  try {
    // Update only the fields that are provided
    const updatedTask = await pool.query(
      `UPDATE tasks 
       SET 
         title = COALESCE($1, title), 
         description = COALESCE($2, description), 
         isComplete = COALESCE($3, isComplete)
       WHERE id = $4 AND userId = $5
       RETURNING *`,
      [title, description, isComplete, id, userId]
    );

    // If no rows were updated, the task was not found or does not belong to the user
    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.json(updatedTask.rows[0]); // Send back the updated task
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Could not update task" });
  }
};

// 🔹 Delete a Task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND userId = $2 RETURNING *", [id, userId]);

    if (result.rows.length === 0) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete task" });
  }
};

// Corrected `module.exports` (Only One)
module.exports = { createTask, getTasks, updateTask, deleteTask };
