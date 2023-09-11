const mongoose = require('mongoose')

const purchaseSchema = mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    description: String,
    cost: Number,
    buyer: String,
    purchaseDate: Date,
})

purchaseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Purchase', purchaseSchema)
