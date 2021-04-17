const usersModel = require('../models/users/user-model')
const journalsModel = require('../models/journals/journals-model')
const placeModel = require('../models/places/place-model')

findPlaceById = (id) => {
    return placeModel.findOne({_id: id})
}

createPlace = (place) => {
    return placeModel.create(place)
}

addJournalToPlace =(placeId, journalId) => {
    return placeModel.updateOne({_id:placeId}, {$push : { journals : journalId }})
}

removeJournalFromPlace =(placeId, journalId) => {
    return placeModel.updateOne({_id:placeId}, {$pull : { journals : journalId }})
}

module.exports = {
    findPlaceById, createPlace, addJournalToPlace, removeJournalFromPlace
}