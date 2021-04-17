const placeDao = require("../daos/place-dao")

const createPlace = (place) =>
    placeDao.createPlace(place)

const findPlaceById = (id) =>
    placeDao.findPlaceById(id)

addJournalToPlace =(placeId, journalId) => {
    return placeDao.addJournalToPlace(placeId, journalId)
}

removeJournalFromPlace =(placeId, journalId) => {
    return placeDao.removeJournalFromPlace(placeId, journalId)
}

module.exports={
    createPlace, findPlaceById,addJournalToPlace, removeJournalFromPlace

}