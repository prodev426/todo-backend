const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors"); // Import CORS

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON parsing

// GET /tasks - Fetch all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /tasks - Create a new task
app.post("/tasks", async (req, res) => {
  try {
    const { title, color, completed } = req.body;

    console.log("Incoming request body:", req.body); // Debugging line

    const task = await prisma.task.create({
      data: { title, color, completed },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error); // Debugging line
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT /tasks/:id - Update a task
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, color, completed } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, color, completed },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /tasks/:id - Delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
