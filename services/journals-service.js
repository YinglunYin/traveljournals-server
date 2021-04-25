const journalsDao = require('../daos/journals-dao')
const usersDao = require('../daos/user-dao')
const placeDao = require('../daos/place-dao')

const getPhoto = (photos) => {
    if (photos !== undefined) {
        let l = photos.length
        if (l === 0) {
            return ""
        } else {
            let p = Math.floor(Math.random() * l)
            return photos[p].photo_reference
        }
    } else {
        return ""
    }
}

const createJournal = async (journal) => {

    let re1 = await placeDao.findPlaceById(journal.place.place_id)
    if (re1) {
        // place exist
        let re2 = await journalsDao.createJournal({
                                                      title: journal.title,
                                                      textRaw: journal.textRaw,
                                                      textHtml: journal.textHtml,
                                                      abstract: journal.abstract,
                                                      author: journal.author,
                                                      img: getPhoto(journal.place.photo),
                                                      place: re1._id,
                                                      liker: []
                                                  })
        if (re2) {
            let re3 = await usersDao.addJournalToUser(journal.author, re2._id)
            let re4 = await placeDao.addJournalToPlace(re1._id, re2._id)
            if (re3 && re4) {
                return re2
            } else {
                return 9
            }
        } else {
            return 9
        }
    } else {
        let re2 = await placeDao.createPlace({
                                                 _id: journal.place.place_id,
                                                 name: journal.place.name,
                                                 address: journal.place.address,
                                                 lat: journal.place.lat,
                                                 lng: journal.place.lng,
                                                 journals: []
                                             })
        if (re2) {
            let re3 = await journalsDao.createJournal({
                                                          title: journal.title,
                                                          textRaw: journal.textRaw,
                                                          textHtml: journal.textHtml,
                                                          abstract: journal.abstract,
                                                          author: journal.author,
                                                          img: getPhoto(journal.place.photo),
                                                          place: re2._id,
                                                          liker: []
                                                      })
            if (re3) {
                let re4 = await usersDao.addJournalToUser(journal.author, re3._id)
                let re5 = await placeDao.addJournalToPlace(re2._id, re3._id)
                if (re4) {
                    return re3
                } else {
                    return 9
                }
            } else {
                return 9
            }
        } else {
            return 9
        }
    }
}

const findJournalById = (id) => {
    return journalsDao.findJournalById(id)
}

const updateJournal = async (id, journal) => {
    let old_j = await journalsDao.findJournalById(id)
    if (old_j) {
        if (old_j.place._id === journal.place._id) {
            let re = await journalsDao.updateJournal(id, {
                textRaw: journal.textRaw,
                textHtml: journal.textHtml,
                title: journal.title,
                abstract: journal.abstract
            })
            if (re) {
                return 14
            } else {
                return 13
            }
        } else {
            let re1 = await placeDao.findPlaceById(journal.place._id)
            if (re1) {
                // place exist
                let re2 = await placeDao.addJournalToPlace(re1._id, id)
                let re3 = await placeDao.removeJournalFromPlace(re1._id, id)
                if (re2 && re3) {
                    let re4 = await journalsDao.updateJournal({
                                                                  textRaw: journal.textRaw,
                                                                  textHtml: journal.textHtml,
                                                                  title: journal.title,
                                                                  abstract: journal.abstract,
                                                                  place: journal.place
                                                              })
                    if (re4) {
                        return 14
                    } else {
                        return 13
                    }
                } else {
                    return 13
                }

            } else {
                // create place
                let re2 = await placeDao.createPlace(journal.place)
                if (re2) {
                    let re3 = await placeDao.addJournalToPlace(re2._id, id)
                    let re4 = await placeDao.removeJournalFromPlace(journal.place.place_id, id)
                    if (re3 && re4) {
                        let re5 = await journalsDao.updateJournal(id, {
                            textRaw: journal.textRaw,
                            textHtml: journal.textHtml,
                            title: journal.title,
                            abstract: journal.abstract,
                            place: journal.place
                        })
                        if (re5) {
                            return 14
                        } else {
                            return 13
                        }
                    } else {
                        return 13
                    }
                } else {
                    return 13
                }
            }
        }
    }
}

const findPopularJournal = (num) => {
    return journalsDao.findJournalByLikeNum(num)
}

const deleteJournal = (id) => {
    return journalsDao.deleteJournal(id)
}

const likeAJournal = async (username, journal_id) => {
    let user = await usersDao.findUserByUsername(username)
    let re = await usersDao.addJournalTolikes(user._id, journal_id)
    if (re.nModified >= 1) {
        let re2 = await journalsDao.likeAJournal(user._id, journal_id)
        return 16
    } else {
        return 15
    }

}

const dislikeAJournal = async (username, journal_id) => {
    let user = await usersDao.findUserByUsername(username)
    let re = await usersDao.removeJournalFromLikes(user._id, journal_id)
    if (re.nModified >= 1) {
        let re2 = await journalsDao.disLikeAJournal(user._id, journal_id)
        return 16
    } else {
        return 15
    }

}

const findAllJournals = async () => {
    let re = await journalsDao.findAllJournals()
    if (re) {
        return re
    } else {
        return 33
    }
}

module.exports =
    {
        createJournal,
        findJournalById,
        updateJournal,
        findPopularJournal,
        deleteJournal,
        likeAJournal,
        dislikeAJournal,
        findAllJournals
    }