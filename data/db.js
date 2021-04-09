module.exports = function () {
    const mongoose = require('mongoose');
    const databaseName = 'traveljournal'
    let connectionString =
        'mongodb://localhost/';
    connectionString += databaseName;
    mongoose.connect(connectionString);

// we're connected!
}