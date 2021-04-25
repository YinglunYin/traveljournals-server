const mongoose = require('mongoose');
const usersModel = require('../../models/users/user-model')
const placeModel = require('../../models/places/place-model')

const JournalSchema = mongoose.Schema({
                                          title: String,
                                          author: {
                                              type: mongoose.Schema.Types.ObjectId,
                                              ref: 'userModel'
                                          },
                                          img: String,
                                          date: {type: Date, default: Date.now},
                                          textRaw: String,
                                          textHtml: String,
                                          abstract: String,
                                          place: {type: String, ref: 'placeModel'},
                                          liker: [{
                                              type: String,
                                              ref: 'userModel'
                                          }],
                                          like_num: {type: Number, default: 0}
                                      }, {collection: 'journals'});

// Cannot use ES6 function like ()=> {}
JournalSchema.pre('deleteOne', {query: true, document: false}, function (next) {
    let journalId = this.getQuery()['_id']
    if (journalId !== undefined) {
        usersModel
            .updateMany({likes: journalId}, {$pull: {likes: journalId}}, {multi: true}, next)
    }
});

JournalSchema.pre('deleteOne', function (next) {
    let journalId = this.getQuery()['_id']
    usersModel
        .updateMany({journals: journalId}, {$pull: {journals: journalId}}, {multi: false}, next)
});

JournalSchema.pre('deleteOne', function (next){
    let journalId = this.getQuery()['_id']
    placeModel
        .updateMany({journals: journalId}, {$pull: {journals: journalId}}, {multi: false}, next)
});

module.exports = JournalSchema;