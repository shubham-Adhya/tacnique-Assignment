const express = require("express")
const cors = require('cors')
require("dotenv").config()

const { connection } = require("./configs/mongoDB")
const { verifyToken } = require('./middlewares/jwt.middleware')
const { notFound } = require('./middlewares/error.middleware')

const { userRouter } = require("./routes/user.routes")
const { tasksRouter } = require("./routes/tasks.routes")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    return res.status(200).send("Welcome to Task Management API, for docs visit /api-docs")
})

// All the user Routes
app.use('/user', userRouter)

// All the task routes are JWT protected
app.use('/tasks', verifyToken, tasksRouter)

// If the requested route doesn't exist
app.use(notFound)

app.listen(process.env.PORT, async () => {
    try {
        await connection.then(() => console.log("Connected to MongoDB"))
    } catch (err) {
        console.log(err)
    }
    console.log(`Server is running at PORT ${process.env.port}`)
})