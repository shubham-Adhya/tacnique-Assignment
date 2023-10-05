const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }
}, {
    timeStamps: true   //createdAt and updatedAt 
})

const TaskModel = mongoose.model('task', taskSchema)

module.exports = { TaskModel }