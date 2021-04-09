const usersModel = require('../models/users/user-model')
const journalsModel = require('../models/journals/journals-model')
const place = require('../models/places/place-model')

findAllUsers = () =>
    usersModel.find();

createUser = (users) =>
    usersModel.create(users);

findUserById = (id) =>
    usersModel.findById(id);

findUserByUsername = (uname) =>
    usersModel.find({username: uname})

findUserByUsernamePassword = (uname, upass) => {
    return usersModel.find({username: uname, password: upass})
}

module.exports = {findAllUsers, createUser, findUserByUsernamePassword}
