const mongoose = require('mongoose');
const journalSchema = require('./journal-schema');
const journalModel = mongoose.model('journal', journalSchema);

module.exports = journalModel