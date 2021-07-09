const mongoose = require('mongoose')

const connect = () => {
  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

module.exports = {
  connect
}
