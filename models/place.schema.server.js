const mongoose = require('mongoose');
const placeSchema = mongoose.Schema({
                                        name: String,
                                        lng: Number,
                                        lat: Number,
                                        address: String,
                                        relatedJournals: [String],
                                    });
module.exports = placeSchema;