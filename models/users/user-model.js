const mongoose = require('mongoose');
const userSchema = require('./user-schema');

const userModel = mongoose.model('users', userSchema);

module.exports = userModel