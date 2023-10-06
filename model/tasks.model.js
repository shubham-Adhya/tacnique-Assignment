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
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    }
}, {
    timestamps: true,//createdAt and updatedAt
    versionkey: true
})

const TaskModel = mongoose.model('task', taskSchema)

module.exports = { TaskModel }