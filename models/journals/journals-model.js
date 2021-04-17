const mongoose = require('mongoose');
const journalSchema = require('./journal-schema');
const journalModel = mongoose.model('journalModel', journalSchema);

module.exports = journalModel