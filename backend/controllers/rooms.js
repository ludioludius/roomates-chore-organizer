const roomsRouter = require('express').Router()
const Room = require('../models/room')
const User = require('../models/user')
const Task = require('../models/task')
const ChoreAssignment = require('../models/choreAssignment');

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

    // add a room name and update rooms users
    room.name = roomName;
    room.users = room.users.concat(user._id);
    await room.save();


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
    if (!room) {
        return res.status(404).json({error: 'Room not found'});
    }

    // set the users room code to point to that room and save the user
    user.roomcode = room._id; // TODO: Refactor this to camel case
    await user.save();

    // add user to room
    room.users = room.users.concat(user._id);
    await room.save();

    res.status(200).send();
})

//
roomsRouter.post('/createSchedule/:numWeeks/:roomName', async (req, res) => {

    const numWeeks = req.params.numWeeks;
    const roomName = req.params.roomName;

    // find the room associated with the roomName // TODO: repeated code, refactor to function
    let room = await Room.findOne({name: roomName});
    if (!room) {
        return res.status(404).json({error: 'Room not found'});
    }

    const roomWithTasks = await room.populate('tasks')
    const roomWithUsers = await room.populate("users")

    // creates a chore list by assigning tasks to users per week;
    // i.e. the chores that need to be done in a week for numWeeks
    room.choreList = await choreListCreator(roomWithTasks.tasks, roomWithUsers.users, numWeeks);
    await room.save();
    res.status(200).send();
})


//
async function choreListCreator(tasks, users, numWeeks) {

    const choreList = [];
    let weekOfMonth = -1; // number between 0 and 3 for keeping track of monthly and biweekly tasks

    for (let i = 0; i < numWeeks; i++) {
        const week = getWeekIdentifier(new Date()); // Get week identifier for the current week
        const assignments = [];

        // update weekOfMonth
        if (weekOfMonth === 4) {
            weekOfMonth = -1;
        } else {
            weekOfMonth++;
        }

        // Shuffle tasks and users arrays to randomize assignment
        shuffleArray(tasks);
        shuffleArray(users)


        // Assign weekly tasks to users
        for (const task of tasks) {
            const index = tasks.indexOf(task);
            if (task.frequency === 7) { // if task is a weekly task
                const userIndex = index % users.length; // Assign tasks in round-robin fashion

                // create the chore assignment
                let choreAssignment = new ChoreAssignment();
                choreAssignment.assignedUser = users[userIndex].uid;
                choreAssignment.chore = task;
                choreAssignment.week = week;
                // const assignment = {
                //     roommate: users[userIndex],
                //     chore: task,
                //     week: week
                // };
                await choreAssignment.save();
                assignments.push(choreAssignment._id);
            }
        }

        // Assign bi-weekly ( every 2 weeks ) tasks to users
        if (weekOfMonth === 1 || weekOfMonth === 3) {
            for (const task of tasks) {
                const index = tasks.indexOf(task);
                if (task.frequency === 14) { // if task is a weekly task
                    const userIndex = index % users.length; // Assign tasks in round-robin fashion
                    // create the chore assignment
                    let choreAssignment = new ChoreAssignment();
                    choreAssignment.assignedUser = users[userIndex].uid;
                    choreAssignment.chore = task;
                    choreAssignment.week = week;
                    await choreAssignment.save();
                    assignments.push(choreAssignment._id);
                }
            }
        }

            // Assign monthly ( every 4 weeks ) tasks to users
            if (weekOfMonth === 3) {
                for (const task of tasks) {
                    const index = tasks.indexOf(task);
                    if (task.frequency === 30) { // if task is a weekly task
                        const userIndex = index % users.length; // Assign tasks in round-robin fashion

                        // create the chore assignment
                        let choreAssignment = new ChoreAssignment();
                        choreAssignment.assignedUser = users[userIndex].uid;
                        choreAssignment.chore = task;
                        choreAssignment.week = week;
                        // const assignment = {
                        //     roommate: users[userIndex],
                        //     chore: task,
                        //     week: week
                        // };
                        await choreAssignment.save();
                        assignments.push(choreAssignment._id);
                    }
                }
            }

            choreList.push(...assignments);
        }

        return choreList;
}

// Function to shuffle array elements (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to calculate the week identifier for a given date
function getWeekIdentifier(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = firstDayOfYear.getDay();
    const daysOfYear = Math.floor((date - firstDayOfYear) / 86400000);
    const weekNumber = Math.ceil((daysOfYear + daysOffset + 1) / 7);
    return `${year}-W${weekNumber}`;
}


module.exports = roomsRouter