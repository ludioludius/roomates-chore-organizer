const tasksRouter = require('express').Router()
const Task = require('../models/task.js')
const Room = require('../models/room.js')
const User = require("../models/user");


tasksRouter.get('/:roomName', async (req, res) => {

    const name = req.params.roomName
    console.log('roomName: ', name)

    //returns an array
    const roomWithTasks = await Room.find({name: name}).populate('tasks')

    console.log(roomWithTasks[0].tasks)
    res.json(roomWithTasks[0].tasks)
})


tasksRouter.delete('/:id', (req, res) => {

    const id = req.params.id
    console.log(id)

    Task.findByIdAndDelete(id)
        .then(response => {
            console.log(response)
            res.status(204).send()})
        .catch(error => {
            console.log(error)
            res.status(404).send()})
})


tasksRouter.post('/', async (req, res) => {

    const {name, description, frequency, roomName} =  req.body
    console.log(req.body)
    console.log(name, description, frequency)
    
    const newTask = new Task({name, description, frequency})
    let room = await Room.findOne({name: roomName});
    console.log(room)

    await Room.findOneAndUpdate({name: roomName}, {tasks: room.tasks.concat(newTask)})

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

module.exports = tasksRouter