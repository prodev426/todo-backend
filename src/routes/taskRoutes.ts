import express from "express";
import * as TaskController from "../controllers/taskController";

const router = express.Router();

router.post("/", TaskController.createTask);
router.get("/", TaskController.getTasks);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;
