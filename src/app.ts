import express from "express";
import cors from "cors";
import taskRoutes from "../src/routes/taskRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// API Versioning
app.use("/v1/tasks", taskRoutes);

export default app;
