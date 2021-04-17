const mongoose = require('mongoose');
const userSchema = require('./user-schema');

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel