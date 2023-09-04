const tasksRouter = require('express').Router()
const Task = require('../models/task.js')
const Room = require('../models/room.js')


tasksRouter.get('/:roomcode', async (req, res) => {

    const roomcode = req.params.roomcode
    console.log('Roomcode: ', roomcode)

    //returns an array
    const roomWithTasks = await Room.find({_id: roomcode}).populate('tasks')

    console.log(roomWithTasks[0].tasks)
    res.json(roomWithTasks[0].tasks)
})


tasksRouter.delete('/:id', (req, res) => {

    const id = req.params.id

    Task.findByIdAndDelete(id)
        .then(response => {
            console.log(response)
            res.status(204).send()})
        .catch(error => {
            console.log(error)
            res.status(404).send()})
})


tasksRouter.post('/', async (req, res) => {

    const {name, description, frequency, roomcode} =  req.body
    console.log(req.body)
    console.log(name, description, frequency)
    
    const newTask = new Task({name, description, frequency})
    const room = await Room.findById(roomcode)
    console.log(room)

    await Room.findOneAndUpdate({_id: roomcode}, {tasks: room.tasks.concat(newTask)})

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