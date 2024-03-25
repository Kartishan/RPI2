import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import TaskModel from './TaskModel.js';
import validateTaskData from './middlewares/validateTaskData.js';


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error: ', err));

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post("/tasks",validateTaskData, async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await TaskModel.findOneAndDelete({ id });
        if (!deletedTask) {
            return res.status(404).send("Task not found");
        }
        res.json(deletedTask);
    } catch (err) {
        res.status(500).send(err.message);
    }
});




