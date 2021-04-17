const journalsDao = require('../daos/journals-dao')

const createJournal = (journal) => {
    return journalsDao.createJournal(journal)
}

const findJournalById = (id) => {
    return journalsDao.findJournalById(id)
}

const updateJournal = (id, journal) => {
    return journalsDao.updateJournal(id, journal)
}

const findPopularJournal = (num) => {
    return journalsDao.findJournalByLikeNum(num)
}

const deleteJournal = (id) => {
    return journalsDao.deleteJournal(id)
}

module.exports = {createJournal, findJournalById, updateJournal, findPopularJournal}