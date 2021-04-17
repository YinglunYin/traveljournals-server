const usersDao = require("../daos/user-dao")

const createUser = (user) =>
    usersDao.createUser(user)

const findUserByUsernamePassword = (uname, upass) =>
    usersDao.findUserByUsernamePassword(uname, upass)
const findUserByName = (unane) =>
    usersDao.findUserByUsername(unane)

const findProfile = (uname) =>
    usersDao.findProfile(uname)

const updateProfile = (user, id) =>
    usersDao.updateProfile(user,id)

const deleteUser = (userId) =>
    usersDao.deleteUser(userId)

const addJournalToUser = (userId, journalId) =>
    usersDao.addJournalToUser(userId, journalId)

const removeJournalFromUser = (userId, journalId) =>
    usersDao.removeJournalFromUser(userId, journalId)

const addJournalTolikes = (userId, journalId) =>
    usersDao.addJournalTolikes(userId, journalId)

const removeJournalFromLikes = (userId, journalId) =>
    usersDao.removeJournalFromLikes(userId, journalId)

const findJournalByUser = (userId) => {
    return usersDao.findJournalByUser(userId)
}

const findUserLikes = (userId) => {
    return usersDao.findUserLikes(userId)
}

const findAllUsers = () => {
    return usersDao.findAllUsers()
}

module.exports={createUser,
    findUserByUsernamePassword,
    findUserByName,
    findProfile,
    updateProfile,
    deleteUser,
    addJournalToUser,
    addJournalTolikes,
    removeJournalFromLikes,
    removeJournalFromUser,
    findJournalByUser,
    findUserLikes,
    findAllUsers
}