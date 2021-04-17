const mongoose = require('mongoose');
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
module.exports = JournalSchema;