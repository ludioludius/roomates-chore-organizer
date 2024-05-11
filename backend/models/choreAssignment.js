const mongoose = require('mongoose')

const choreAssignmentSchema = mongoose.Schema({
    assignedUser: String,
    chore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    week: String
})

choreAssignmentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('ChoreAssignment', choreAssignmentSchema)