const express = require("express")
const tasksRouter = express.Router()

const {
    addTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
} = require("../controllers/tasks.controller")

//@description   Add a new task
//@route         POST /tasks
//@access        JWT Authenticated User
tasksRouter.post('/', addTask)

//@description   Retrieve a list of all tasks
//@route         GET /tasks
//@access        JWT Authenticated User
tasksRouter.get('/', getAllTasks)

//@description   Retrieve a specific task by ID
//@route         GET /tasks/:id
//@access        JWT Authenticated User
tasksRouter.get('/:id', getTaskById)

//@description   Update a specific task by ID
//@route         PUT /tasks/:id
//@access        JWT Authenticated User
tasksRouter.put('/:id', updateTaskById)

//@description   Delete a specific task by ID
//@route         DELETE /tasks/:id
//@access        JWT Authenticated User
tasksRouter.delete('/:id', deleteTaskById)

module.exports = { tasksRouter }