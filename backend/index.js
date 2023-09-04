const express =  require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//contollers
const tasksRouter = require('./controllers/tasks')
const usersRouter = require('./controllers/users')


//middleware
app.use(express.json())
app.use(cors())


//Data
const Task = require('./models/task')
const User = require('./models/user')
const Room = require('./models/room')


mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('connected to MongoDB')
})
.catch(() => {
    console.log('error connecting to MongoDB')
})


app.use('/api/tasks', tasksRouter)
app.use('/api/users', usersRouter)


app.listen(process.env.PORT, () => {
    console.log(`server listening on ${process.env.PORT}`)
})





