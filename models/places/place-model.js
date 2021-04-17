const mongoose = require('mongoose');
const placeSchema = require('./place-schema');
const placeModel = mongoose.model('placeModel', placeSchema);


module.exports = placeModel