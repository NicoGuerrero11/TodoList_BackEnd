import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find()
        res.json(tasks);
    }catch (err){
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
};

export const getTask = async (req, res) => {
    const { id } = req.params;
    try{
        const task = await Task.findById(id)
        if (!task) return res.status(404).json({
            message: "Task not found"
        })
        res.json(task);
    }catch (err){
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
};

export const addTask = async (req, res) => {
    const newTask = new Task(req.body)
    try{
        await newTask.save();
        res.status(201).json({
            message: "Task created",
            task: newTask
        })
    }catch (err){
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
};

export const updateTask = async (req, res) => {
    const {id} = req.params;
    const {task, completed, date} = req.body;
    try{
        const taskUpdate = await Task.findByIdAndUpdate(
            id,
            {task, completed, date},
            {new: true}
        )
        if (!taskUpdate) return res.status(404).json({
            message: "Task not found"
        })
        res.json(
            {
                message: "Task updated",
                task: taskUpdate
            }
        )
    }catch (err){
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
};

export const deleteTask = async (req, res) => {
    const {id} = req.params;
    try{
        const taskDelete =  await Task.findByIdAndDelete(id)
        if (!taskDelete) return res.status(404).json({
            message: "Task not found"
        })
        res.sendStatus(204)
    }catch (err){
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
};