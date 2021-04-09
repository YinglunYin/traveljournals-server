const mongoose = require('mongoose');
const journalSchema = require('./journal.schema.server');
const journalModel = mongoose.model('journal', journalSchema);

createJournal = (journal) =>
    journalModel.create(journal);



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
