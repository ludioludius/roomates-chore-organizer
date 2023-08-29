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
  room:
    {
      type: String,
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)