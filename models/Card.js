const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: String,
    description: String,
    benefits: [String],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Card', cardSchema);
