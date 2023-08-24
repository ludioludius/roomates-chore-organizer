const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    frequency: Number,

    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }
})

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Task', taskSchema)
