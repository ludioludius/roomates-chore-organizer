const roomsRouter = require('express').Router()
const Room = require('../models/room')
const User = require('../models/user')

// create a new room and assign the requesting user to that room
roomsRouter.post('/createRoom/:uid/:roomName', async (req, res) => {

    const uid = req.params.uid;
    const roomName = req.params.roomName;

    // create a new Room
    const room = new Room();
    console.log("ROOM CREATED", room);
    const roomId = room._id;

    // find the user associated with the uid
    let user = await User.findOne({uid: uid})
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // set the users room code to point to that room and save the user
    user.roomcode = roomId; // TODO: Refactor this to camel case
    await user.save();

    // create a new field called room name that identifies a room for the users
    room.name = roomName;
    await room.save();

    // TODO: add the current user into the room

    // return the room name for the newly created room
    res.status(200).send({roomName: roomName});


})

// if the room code is valid: assign the requesting user to the room
roomsRouter.patch('/joinRoom/:uid/:roomName', async (req, res) => {
    const uid = req.params.uid;
    const roomName = req.params.roomName;

    // find the user associated with the uid
    let user = await User.findOne({uid: uid})
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }

    // find the room associated with the roomName
    let room = await Room.findOne({name: roomName});
    const roomId = room._id;
    if (!room) {
        return res.status(404).json({error: 'Room not found'});
    }

    // set the users room code to point to that room and save the user
    user.roomcode = roomId; // TODO: Refactor this to camel case
    await user.save();

    res.status(200).send();
})

module.exports = roomsRouter