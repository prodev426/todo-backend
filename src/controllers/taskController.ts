import { Request, Response } from "express";
import * as TaskService from "../services/taskServices";

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, color, completed } = req.body;

    const task = await TaskService.createTask(title, color, completed);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, color, completed } = req.body;

    const task = await TaskService.updateTask(
      Number(id),
      title,
      color,
      completed
    );
    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await TaskService.deleteTask(Number(id));
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
