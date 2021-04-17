const usersModel = require('../models/users/user-model')
const journalsModel = require('../models/journals/journals-model')
const placeModel = require('../models/places/place-model')

createJournal = (journal) => {
    return journalsModel.create(journal);
}

updateJournal = (id, journal) => {
    return journalsModel.updateOne({_id: id}, journal)
}

deleteJournal = (id) => {
    return journalsModel.deleteOne({_id: id})
}

findJournalByAuthor = (author) => {

}

findJournalByPlace = (place) => {

}

findJournalByLikeNum = (num) => {
    return journalsModel.find({}, {title: 1, abstract: 1, like_num: 1, img: 1}).sort({like_num: -1})
        .limit(num)
}

findJournalById = (id) => {
    return journalsModel.findOne({_id: id}).populate('author').populate('place')
}

likeAJournal = (userId, journalId) => {
    return journalsModel.updateOne({_id: journalId},
                                   {$push: {liker: journalId}, $inc: {like_num: +1}})
}

findPlaceJournal = (placeId) => {
    return placeModel.findOne({_id: placeId}).populate("journals", {title: 1, abstract: 1, like_num: 1, img: 1})
}

disLikeAJournal = (user, journal) => {

}

deleteJournalByAuthor = () => {

}

module.exports =
    {
        createJournal,
        findJournalById,
        updateJournal,
        likeAJournal,
        disLikeAJournal,
        findJournalByLikeNum,
        deleteJournal,
        findPlaceJournal
    }
