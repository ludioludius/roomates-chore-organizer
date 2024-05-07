const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    roomcode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

//userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)