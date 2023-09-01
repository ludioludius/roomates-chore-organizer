const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  roomcode:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      //added to hide password hash
      delete returnedObject.passwordHash
    }
  })

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)