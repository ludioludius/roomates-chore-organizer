const usersRouter = require('express').Router()
const User = require('../models/user')
const Room = require('../models/room')


usersRouter.put('/', (request, response) => {

    const { username, name, password, room } = request.body
    console.log( username, name, password, room)
  
    User.findOneAndUpdate({username: username}, {room: Number(room)}, {returnOriginal: false})
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => console.log(error))
  })


usersRouter.post('/signup', async (req, res) => {
    console.log(req.body)
    var { name, username, password, roomcode } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    try {
         var valid = await Room.findById(roomcode)
    } 
    catch(e) {
        valid = null
    }

    if (roomcode === "") {
        //case where roomcode needs to be set
        var room = new Room()
        roomcode = room._id
         console.log("ROOM CREATED", room)
    } else if (!valid) {
        // return error
        return res.status(400).send({
            error: 'invalid room code'
         })
    } else {
        // case where roomcode is valid
        var room = await Room.findOne({_id: roomcode})
    }

    const user = new User({
        username,
        name,
        passwordHash,
        roomcode
    })

    await room.save()

    console.log(user)

    user.save()
        .then( async (response) => {
            console.log(response)

            const userForToken = {
                username: user.username,
                id: user._id,
            }
            
            const token = jwt.sign(userForToken, process.env.SECRET)

            res
                .status(200)
                .send({ token, username: user.username, name: user.name, roomcode: user.roomcode, id: user._id})
        })
        .catch((error) => {
            console.log(error)
            res.status(401).json({error: "username must me unique"})
        })
})

module.exports = usersRouter