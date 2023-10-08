require("dotenv").config()

const { TaskModel } = require("../model/tasks.model")

//@description   Add a new task
//@route         POST /tasks
//@access        JWT Authenticated User
const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Missing required field' })
        }

        const task = new TaskModel({ ...req.body, user: req.user._id });
        await task.save();

        return res.status(201).json({ message: "New Task Created", task });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

//@description   Retrieve a list of all tasks
//               Filters on : { "status": ["pending","completed"]] }
//               Pagination : {_page:1,_limit=10}
//@route         GET /tasks
//@access        JWT Authenticated User
const getAllTasks = async (req, res) => {

    try {
        const condition = { user: req.user._id }
        let tasks = TaskModel.find(condition);

        if (req.query.status) {
            tasks = tasks.find(
                { status: req.query.status.split(',') }
            );
        }
        if (req.query._page && req.query._limit) {
            const pageSize = req.query._limit;
            const page = req.query._page;
            tasks = tasks.skip(pageSize * (page - 1)).limit(pageSize);
        }

        tasks = await tasks.select('-user -__v').exec()

        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(500).json({ message: "Tasks not found", error: error.message });
    }
}

//@description   Retrieve a specific task by ID
//@route         GET /tasks/:id
//@access        JWT Authenticated User
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findOne({
            user: req.user._id,
            _id: id
        }).select('-user -__v');

        return res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({ message: "Task not found", error: error.message });
    }
}

//@description   Update a specific task by ID
//@route         PUT /tasks/:id
//@access        JWT Authenticated User
const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        let task = TaskModel.findOneAndUpdate(
            {
                user: req.user._id,
                _id: id
            },
            { ...req.body },
            {
                new: true,
            }
        );
        task = await task.select('-user -__v').exec();

        return res.status(200).json({ message: "Task Updated", task });
    } catch (error) {
        return res.status(500).json({ message: "Task not found", error: error.message });
    }
}

//@description   Delete a specific task by ID
//@route         DELETE /tasks/:id
//@access        JWT Authenticated User
const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findOneAndDelete(
            {
                user: req.user._id,
                _id: id
            }
        );
        return res.status(200).json({ message: "Task Deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Task not found", error: error.message });
    }
}

module.exports = {
    addTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
}