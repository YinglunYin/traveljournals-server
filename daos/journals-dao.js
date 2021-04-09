const usersModel = require('../models/users/user-model')
const journalsModel = require('../models/journals/journals-model')
const place = require('../models/places/place-model')

createJournal = (journal) =>
    journalsModel.create(journal);

const getPhoto = (photos) => {
    let l = photos.length
    if (l === 0){
        return ""
    }else {
        let p = Math.floor(Math.random() * l)
        return photos[p].photo_reference
    }
}


module.exports = {createJournal}
