import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    id: String,
    title: String,
    status: String
});

const TaskModel = mongoose.model('Task', taskSchema);

export default TaskModel;