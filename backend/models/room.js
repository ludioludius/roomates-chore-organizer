const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    name: {
        type: String,
    },
    tasks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task'
        }
    ],
    purchases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase'
      }
  ],
  
})

roomSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Room', roomSchema)