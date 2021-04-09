const mongoose = require('mongoose');
const placeSchema = require('./place-schema');
const placeModel = mongoose.model('place', placeSchema);


module.exports = placeModel