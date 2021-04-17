const mongoose = require('mongoose');
const placeSchema = mongoose.Schema({
                                        _id: String,
                                        name: String,
                                        lng: Number,
                                        lat: Number,
                                        address: String,
                                        journals: [{type: mongoose.Schema.Types.ObjectId, ref: 'journalModel'}]
                                    },{collection: 'places'});
module.exports = placeSchema;