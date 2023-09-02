const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    language: String,
    questions: [],
});

module.exports = mongoose.model('Language', LanguageSchema);