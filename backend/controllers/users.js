const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usersRouter = require('express').Router()
const User = require('../models/user')
const Room = require('../models/room')
const { initializeApp } = require('firebase-admin/app');
const {auth} = require("firebase-admin");

// firebase admin sdk
const admin = require('firebase-admin');
const serviceAccount = require('../API_key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


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
    var {idToken} = req.body

    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            const user = new User({uid: uid});
            return user.save()})
        .then(() => {
            console.log("user verified")
        })

    //     const saltRounds = 10
    //     const passwordHash = await bcrypt.hash(password, saltRounds)
    //
    //     try {
    //          var valid = await Room.findById(roomcode)
    //     }
    //     catch(e) {
    //         valid = null
    //     }
    //
    //     if (roomcode === "") {
    //         //case where roomcode needs to be set
    //         var room = new Room()
    //         roomcode = room._id
    //          console.log("ROOM CREATED", room)
    //     } else if (!valid) {
    //         // return error
    //         return res.status(400).send({
    //             error: 'invalid room code'
    //          })
    //     } else {
    //         // case where roomcode is valid
    //         var room = await Room.findOne({_id: roomcode})
    //     }
    //
    //     const user = new User({
    //         username,
    //         name,
    //         passwordHash,
    //         roomcode
    //      })
    //
    //     await room.save()
    //
    //     console.log(user)
    //
    //     user.save()
    //         .then( async (response) => {
    //             console.log(response)
    //
    //             const userForToken = {
    //                 username: user.username,
    //                 id: user._id,
    //             }
    //
    //             const token = jwt.sign(userForToken, process.env.SECRET)
    //
    //             res
    //                 .status(200)
    //                 .send({ token, username: user.username, name: user.name, roomcode: user.roomcode, id: user._id})
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             res.status(401).json({error: "username must be unique"})
    //         })
})


usersRouter.post('/signin', async (req, res) => {
    const {name, username, password} = req.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null?
    false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
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
    .send({ token, username: user.username, name: user.name, roomcode: user.roomcode, id: user._id})
})

module.exports = usersRouter