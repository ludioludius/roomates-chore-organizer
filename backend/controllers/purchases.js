const purchaseRouter = require('express').Router()
const Room = require('../models/room.js')
const Purchase = require('../models/purchase.js')

purchaseRouter.post('/', async (req, res) => {

    const {item, description, cost, buyer, purchaseDate, roomcode} =  req.body
    console.log(req.body)

    
    const newPurchase = new Purchase({item, description, cost, buyer, purchaseDate})
    const room = await Room.findById(roomcode)
    console.log(room)

    await Room.findOneAndUpdate({_id: roomcode}, {purchases: room.purchases.concat(newPurchase)})

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

purchaseRouter.get('/:roomcode', async (req, res) => {

    const roomcode = req.params.roomcode
    console.log('Roomcode: ', roomcode)

    //returns an array
    const roomWithPurchases = await Room.find({_id: roomcode}).populate('purchases')

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