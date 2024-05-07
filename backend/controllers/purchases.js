const purchaseRouter = require('express').Router()
const Room = require('../models/room.js')
const Purchase = require('../models/purchase.js')
const Task = require("../models/task");
const mongoose = require("mongoose");

purchaseRouter.post('/', async (req, res) => {

    // create the purchase
    const {item, description, cost, buyer, purchaseDate, roomName} =  req.body
    console.log(req.body)
    const newPurchase = new Purchase({item, description, cost, buyer, purchaseDate})

    // find and update the room
    const room = await Room.findOne({name: roomName})
    console.log(room)
    await Room.findOneAndUpdate({name: roomName}, {purchases: room.purchases.concat(newPurchase)})

    // save to the purchase collection
    newPurchase.save()
        .then(response => {
            res.status(201).json(newPurchase)
            console.log(response)
        })
        .catch(e => {
            res.json({error: "problem creating the new purchase"})
            console.log(e)
        })
})

purchaseRouter.get('/:roomName', async (req, res) => {

    const roomName = req.params.roomName
    console.log('roomName: ', roomName)

    //returns an array
    const roomWithPurchases = await Room.find({name: roomName}).populate('purchases')

    console.log(roomWithPurchases[0].purchases)
    res.json(roomWithPurchases[0].purchases)
})

purchaseRouter.delete('/:id/:roomName', (req, res) => {

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
            // Remove the purchases with the specified id from the tasks array
            room.purchases = room.purchases.filter(purchase => !purchase._id.equals(objectId));
            await room.save();
            res.status(204).send()
        })
        .catch(error => {
            console.log(error)
            res.status(404).send()})
})





module.exports = purchaseRouter