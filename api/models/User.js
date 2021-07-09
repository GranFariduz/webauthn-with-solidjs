const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  currentChallenge: {
    type: String,
    required: true
  },
  verifiedAtLeastOnce: {
    type: Boolean,
    required: true
  },
  devices: [
    {
      credentialID: Buffer,
      credentialPublicKey: Buffer,
      counter: Number
    }
  ]
})

module.exports = mongoose.model('User', UserSchema)
