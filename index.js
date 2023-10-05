const express = require("express")
const cors = require('cors')
require("dotenv").config()

const { connection } = require("./configs/mongoDB")
const { notFound } = require('./middlewares/error.middleware')

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    return res.status(200).send("Welcome to Task Management API, for docs visit /api-docs")
})


// If the route doesn't exist
app.use(notFound)

app.listen(process.env.PORT, async () => {
    try {
        await connection.then(() => console.log("Connected to MongoDB"))
    } catch (err) {
        console.log(err)
    }
    console.log(`Server is running at PORT ${process.env.port}`)
})