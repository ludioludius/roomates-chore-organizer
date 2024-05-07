const mongoose = require('mongoose');
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


tasksRouter.delete('/:id/:roomName', (req, res) => {

    const id = req.params.id;
    const roomName = req.params.roomName;
    console.log(id);

    // delete Task and reference to task in Room
    Task.findByIdAndDelete(id)
        .then(async response => {
            const objectId = new mongoose.Types.ObjectId(id);
            const room = await Room.findOne({ name: roomName });
            if (!room) {
                console.log('Room not found.');
                return res.status(404).send();
            }
            // Remove the task with the specified id from the tasks array
            room.tasks = room.tasks.filter(task => !task._id.equals(objectId));
            await room.save();
            res.status(204).send()
        })
        .catch(error => {
            console.log(error)
            res.status(404).send()})
})


tasksRouter.post('/', async (req, res) => {

    // create the task
    const {name, description, frequency, roomName} =  req.body
    console.log(req.body)
    console.log(name, description, frequency)
    const newTask = new Task({name, description, frequency})

    // find and update the room
    let room = await Room.findOne({name: roomName});
    console.log(room)
    await Room.findOneAndUpdate({name: roomName}, {tasks: room.tasks.concat(newTask)})

    // save to the tasks collection
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