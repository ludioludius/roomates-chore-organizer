const express =  require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')


require('dotenv').config()

app.use(express.json())
app.use(cors())



//Data
const Task = require('./models/task')
const User = require('./models/user')
const Room = require('./models/room')
const e = require('cors')


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

app.get('/api/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        res.json(tasks)
      })
})

app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    Task.findByIdAndDelete(id)
    .then(response => {
        console.log(response)
        res.status(204).send()})
    .catch(error => {
        console.log(error)
        res.status(404).send()})
})

app.post('/api/tasks', (req, res) => {
    const {name, description, frequency} =  req.body
    console.log(req.body)
    console.log(name, description, frequency)
    const newTask = new Task({name, description, frequency})

    newTask.save()
    .then(response => {
        res.status(201).json(newTask)
        console.log(response)
    })
    .catch(e => {
        res.json({error: "problem creating the new task"})
        console.log(e)
    })
})

app.put('/api/users/', (request, response) => {
    console.log('in put controller')
    const { username, name, password, room } = request.body
    console.log( username, name, password, room)
  
    User.findOneAndUpdate({username: username}, {room: Number(room)}, {
        returnOriginal: false
      })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => console.log(error))
  })

//endpoint for adding tasks to a room

// creates a user unasigned to a room
// this should probably check if user needs to added to a room or not 
app.post('/api/signup', async (req, res) => {
    console.log(req.body)
    const { name, username, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
        room: ""
    })

    user.save()
    .then((response) => {
        console.log(response)
        const userForToken = {
            username: user.username,
            id: user._id,
          }
        
          const token = jwt.sign(userForToken, process.env.SECRET)

          res
        .status(200)
        .send({ token, username: user.username, name: user.name, room: user.room, id: user._id})
    })
    .catch((error) => {
        console.log(error)
        res.status(401).json({error: "username must me unique"})
    })
})

app.post('/api/signin', async (req, res) => {
    //check if user creds is in data base, and return a token
    const {username, password} = req.body
    console.log(username, password)

    const user = await User.findOne({ username })
    const passwordCorrect = user === null? 
    false: await bcrypt.compare(password, user.passwordHash)

    if (!user || !passwordCorrect) {
        return res.status(401).json({
          error: 'invalid username or password'
        })
      }
    
      const userForToken = {
        username: user.username,
        id: user._id,
      }
    
      const token = jwt.sign(userForToken, process.env.SECRET)
    
      res
        .status(200)
        .send({ token, username: user.username, name: user.name})



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





