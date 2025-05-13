import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: null
    }
})

const Task = mongoose.model('Task', taskSchema);
export default Task;