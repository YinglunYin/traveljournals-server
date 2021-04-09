const mongoose = require('mongoose');
const JournalSchema = mongoose.Schema({
                                       title: String,
    author: String,
    img:String,
    date: { type: Date, default: Date.now },
    text: String,
    placeId: String,
    liker: [String],
    like_num: { type: Number, default: 0 }
                                   });
module.exports = JournalSchema;