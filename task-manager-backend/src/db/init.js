const pool = require("../config/db");

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        isComplete BOOLEAN DEFAULT false,
        userId INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
    `);
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

createTables().then(() => process.exit());
