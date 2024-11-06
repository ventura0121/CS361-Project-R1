const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
    rating: Number,
    comment: String,
    username: String
});

module.exports = mongoose.model('Review', reviewSchema);
