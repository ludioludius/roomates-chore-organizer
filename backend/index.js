const express =  require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


require('dotenv').config()

app.use(express.json())



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

// const exampleTask = new Task({name: 'Clean Room', frequency: 'weekly'})

// exampleTask.save().then((savedTask) => {
//     console.log(savedTask)
//     mongoose.connection.close()
// })

app.get('/', (req, res) => {
    Task.find({}).then(tasks => {
        res.json(tasks)
      })
})

// creates a user unasigned to a room
// this should probably check if user needs to added to a room or not 
app.post('/api/user', async (req, res) => {
    console.log(req.body)
    const { username, name, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

// constraint: this is only called when the user has no room associated, ie just created a new account
//
app.post('/api/createRoom/:roomName/:userName', async (req, res) => {
   
    // construct the room and ,add the user to it, and add the room to the user

    const room = new Room(
        {
            name,
            frequency,

        }
    )
})

//adds the source user name to the room of the target username, needs to check if taget user has a room assigned
app.post('/api/joinRoom/:sourceUserName/:targetUserName', async (req, res) => {
   
    // construct the room and ,add the user to it, and add the room to the user

    const room = new Room(
        {
            name,
            frequency,

        }
    )
})

//need a route for creating a task and updating by the room that created it



app.listen(process.env.PORT, () => {
    console.log(`server listening on ${process.env.PORT}`)
})





