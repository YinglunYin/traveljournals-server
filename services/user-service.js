const usersDao = require("../daos/user-dao")
const journalsDao = require("../daos/journals-dao")

const findUserByUsernamePassword = (uname, upass) =>
    usersDao.findUserByUsernamePassword(uname, upass)
const findUserByName = (unane) =>
    usersDao.findUserByUsername(unane)

const findProfile = (uname) =>
    usersDao.findProfile(uname)

const updateProfile = (user, id) =>
    usersDao.updateProfile(user,id)

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

const deleteUser = async (userId) => {
    let re1 = await usersDao.findJournalByUser(userId)
    if(re1) {
        for (const journal of re1.journals) {
            await journalsDao.deleteJournal(journal._id)
        }

        let re2 = await usersDao.findUserLikes(userId)
        if(re2){
            for (const journal of re2.likes){
                await journalsDao.disLikeAJournal(userId, journal._id)
            }
            await usersDao.deleteUser(userId)
            return 8
        }
    }
    return 7
}

const createUser = async (user) => {
    let re1 = await usersDao.findUserByUsername(user.username);
    if(re1){
        return 3
    }else{
        let re2 = await usersDao.createUser(user);
        return re2
    }
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