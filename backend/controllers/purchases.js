const purchaseRouter = require('express').Router()
const Room = require('../models/room.js')
const Purchase = require('../models/purchase.js')

purchaseRouter.post('/', async (req, res) => {

    const {item, description, cost, buyer, purchaseDate, roomName} =  req.body
    console.log(req.body)

    
    const newPurchase = new Purchase({item, description, cost, buyer, purchaseDate})
    const room = await Room.findOne({name: roomName})
    console.log(room)

    await Room.findOneAndUpdate({name: roomName}, {purchases: room.purchases.concat(newPurchase)})

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

purchaseRouter.delete('/:id', (req, res) => {

    const id = req.params.id

    Purchase.findByIdAndDelete(id)
        .then(response => {
            console.log(response)
            res.status(204).send()})
        .catch(error => {
            console.log(error)
            res.status(404).send()})
})





module.exports = purchaseRouter