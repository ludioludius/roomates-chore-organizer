const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersRouter = require('express').Router();
const User = require('../models/user');
const Room = require('../models/room');
const ChoreAssignment = require('../models/choreAssignment');
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
            let userObject = user.toObject()
            if (Object.keys(userObject).includes("roomcode")) {
                // find the room name that the user is in
                console.log("USER HAS ROOMCODE");
                let room = await Room.findOne({_id: userObject["roomcode"]});
                if (!room) {
                    return res.status(404).json({error: 'Room not found'});
                }
                const roomName = room.name;
                res.status(200)
                    .send({ token, email: decodedToken.email, uid: decodedToken.uid, hasRoom: true, roomName: roomName})
            } else {
                console.log("USER NO HAS ROOMCODE");
                res.status(200)
                    .send({ token, email: decodedToken.email, uid: decodedToken.uid, hasRoom: false})
            }
        })
        .catch((error) => {
            console.log(error)
        })
})



// return the tasks due for the current week for the requesting user
usersRouter.get('/getWeeklySchedule/:uid/:weekId', async (req, res) => {
    console.log("endpoint hit");
    const uid = req.params.uid;
    const weekId = req.params.weekId;

    // get the users chore schedule
    let user = await User.findOne({uid: uid});
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    let userObject = user.toObject();
    if (Object.keys(userObject).includes("roomcode")) {
        // find the room name that the user is in
        let room = await Room.findOne({_id: userObject["roomcode"]});
        if (!room) {
            return res.status(404).json({error: 'Room not found'});
        }
        let roomObject = room.toObject();
        if (Object.keys(roomObject).includes("choreList")) { // check if a chore list has been assigned
            let weeklySchedule =  await getWeeklyUser(uid, weekId,  room);
            console.log(weeklySchedule);
            res.status(200)
                .send({weeklySchedule: weeklySchedule});
        } else {
            return res.status(404).json({error: 'chore list not found'});
        }
    } else {
        res.status(404)
            .json({error: 'user not assigned a room yet'});
    }
})

async function getWeeklyUser(uid, weekId, room) {
    // populate the references
    let roomWithChoreList = await room.populate('choreList');
    console.log(roomWithChoreList.choreList);
    return roomWithChoreList.choreList.filter(choreAssignment => {
        console.log(choreAssignment.week);
        console.log(weekId);
        return choreAssignment.week === weekId && choreAssignment.assignedUser === uid;
    });
}

module.exports = usersRouter