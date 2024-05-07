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


usersRouter.post('/signup', (req, res) => {
    console.log(req.body)
    let {idToken} = req.body

    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            // create and save user with no room assigned
            const uid = decodedToken.uid;
            console.log(uid);
            const user = new User({uid: uid});
            console.log(user);
            return user.save()})
        .then((decodedToken) => {
            console.log("user verified and saved")
            console.log(decodedToken)
            const userForToken = {
                email: decodedToken.email,
                uid: decodedToken.uid,
            }
            console.log(userForToken);
            const token = jwt.sign(userForToken, process.env.SECRET)
            res.status(200)
                .send({ token, email: decodedToken.email, uid: decodedToken.uid, hasRoom: false})})
        .catch((error) => {
            console.log(error)
        })
})


usersRouter.post('/signin', async (req, res) => {
    console.log(req.body)
    let {idToken} = req.body

    admin.auth().verifyIdToken(idToken)
        .then(async (decodedToken) => {
            // find the user
            const uid = decodedToken.uid;
            let user = await User.findOne({uid: uid});
            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }

            // check if user has a room assigned to it
            const userForToken = {
                email: decodedToken.email,
                uid: decodedToken.uid,
            }
            console.log(userForToken);
            const token = jwt.sign(userForToken, process.env.SECRET)
            console.log(Object.keys(user));
            if (Object.keys(user).includes("roomcode")) {
                res.status(200)
                    .send({ token, email: decodedToken.email, uid: decodedToken.uid, hasRoom: true})
            } else {
                res.status(200)
                    .send({ token, email: decodedToken.email, uid: decodedToken.uid, hasRoom: false})
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = usersRouter