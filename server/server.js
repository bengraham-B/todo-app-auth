require('dotenv').config()
const express = require("express")
const {cl, dateString} = require("goosefuncs")
const cors = require('cors')
const mongoose = require("mongoose")

const todoRoutes = require('./routes/todo.routes.js')
const authRoutes = require('./routes/user.routes.js')

const app = express()

app.use((req, res, next) => { //^ Shows the path, method and the time when it ran.
    cl(`${req.path} - ${req.method} : ${dateString()}`)
    next()
})

app.use(cors())
app.use(express.json())
app.use('/api/todos', todoRoutes)
app.use('/api/user', authRoutes)

//* Connect to MongoDB
mongoose.connect(process.env.URI, { dbName: process.env.DATABASE_NAME})
    .then(() => {
        cl("Connect to MongoDB - " + `DATABASE: ${process.env.DATABASE_NAME}`)
        app.listen(process.env.PORT, () => {
            cl(`Server running on PORT:${process.env.PORT} - ${dateString()}`)
        })
    })
