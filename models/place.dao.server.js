const mongoose = require('mongoose');
const placeSchema = require('./palce.schema.server');
const placeModel = mongoose.model('place', placeSchema);

createPlace = (place) =>
    placeModel.create(place);


module.exports = {createPlace}