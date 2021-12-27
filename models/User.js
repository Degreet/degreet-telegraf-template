const mongoose = require('mongoose')

const model = new mongoose.Schema({
  userId: Number,
  firstName: String,
  lastName: String,
  username: String,
  lastPing: { type: Date, default: Date.now },
  dateReg: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', model)