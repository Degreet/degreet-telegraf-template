const mongoose = require('mongoose')

const connect = (uri) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.on('error', (e) => {
    console.error(e)
  })
}

module.exports = { connect }