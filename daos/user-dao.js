const usersModel = require('../models/users/user-model')
const journalsModel = require('../models/journals/journals-model')
const place = require('../models/places/place-model')
const mongoose = require('mongoose');

findAllUsers = () =>
    usersModel.find();

createUser = (users) => {

    return usersModel.create({
                                 _id: mongoose.Types.ObjectId(),
                                 username: users.username,
                                 password: users.password,
                                 email: users.email,
                                 type: users.type
                             });
}

findUserById = (id) =>
    usersModel.findById(id);

findUserByUsername = (uname) =>
    usersModel.findOne({username: uname})

findUserByUsernamePassword = (uname, upass) => {
    return usersModel.findOne({username: uname, password: upass})
}

findProfile = (uname) => {
    return usersModel.findOne({username: uname})
}

updateProfile = (user, id) => {
    return usersModel.updateOne({_id: id}, user)
}

addJournalToUser = (userId, journalId) => {
    return usersModel.updateOne({_id: userId}, {$push: {journals: journalId}})
}

addJournalTolikes = (userId, journalId) => {
    return usersModel.updateOne({_id: userId}, {$addToSet: {likes: journalId}})
}

removeJournalFromUser = (userId, journalId) => {
    return usersModel.updateOne({_id: userId}, {$pull: {journals: journalId}})
}

removeJournalFromLikes = (userId, journalId) => {
    return usersModel.updateOne({_id: userId}, {$pull: {likes: journalId}})
}

findJournalByUser = (userId) => {
    return usersModel.findOne({_id: userId}, {journals: 1})
        .populate({
                      path: "journals",
                      select: {title: 1, abstract: 1, like_num: 1, img: 1, author: 1, date:1},
                      populate: {
                          path: "author",
                          select: "username"
                      }
                  })
}

findUserLikes = (userId) => {
    return usersModel.findOne({_id: userId}, {likes: 1})
        .populate({
                      path: "likes",
                      select: {title: 1, abstract: 1, like_num: 1, img: 1, author: 1, date:1},
                      populate: {
                          path: "author",
                          select: "username"
                      }
                  })
}

deleteJournal = (journalId) => {
    return usersModel.updateMany({}, {$pull: {likes: journalId}})
}

deleteUser = (userId) => {
    return usersModel.deleteOne({_id: userId})
}

module.exports = {
    findAllUsers,
    createUser,
    findUserById,
    findUserByUsernamePassword,
    findUserByUsername,
    findProfile,
    updateProfile,
    deleteUser,
    addJournalToUser,
    addJournalTolikes,
    removeJournalFromLikes,
    removeJournalFromUser,
    findJournalByUser,
    findUserLikes,
    deleteJournal
}
