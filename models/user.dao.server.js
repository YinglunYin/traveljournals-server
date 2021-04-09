const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');

const userModel = mongoose.model('users', userSchema);

findAllUsers = () =>
    userModel.find();

createUser = (users) =>
    userModel.create(users);

findUserById = (id) =>
    userModel.findById(id);

findUserByUsername = (uname) =>
    userModel.find({username: uname})

findUserByUsernamePassword = (uname, upass) => {
    return userModel.find({username: uname, password: upass})
}

module.exports = {findAllUsers, createUser, findUserByUsernamePassword}
