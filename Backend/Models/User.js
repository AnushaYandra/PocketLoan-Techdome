const mongoose = require('mongoose');

/* Schema for user model */
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
