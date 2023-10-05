const express = require("express")
const cors = require('cors')

const { connection } = require("./configs/mongoDB")

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.status(200).send("Welcome to Task Management API, for docs visit /api-docs")
})


app.listen(process.env.PORT, async () => {
    try {
        await connection.then(() => console.log("Connected to MongoDB"))
    } catch (err) {
        console.log(err)
    }
    console.log(`Server is running at PORT ${process.env.port}`)
})