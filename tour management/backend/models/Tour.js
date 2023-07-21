const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourSchema = new Schema({
    title: {
        type: String,
        require: true
    },

    durationCount: {
        type: Number,
        require: true
    },

    duration: {
        type: String,
        require: true
    },

    country: {
        type: String,
        require: true
    },

    attractions: {
        type: Array,
        required: true
    },

    includes: {
        type: Array,
        required: true
    },

    amount: {
        type: Number,
        required: true,
    },

    rating: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: false
    },
        
    thumbnail: {
        type: String,
        required: false
    },

    image: {
        type: String,
        required: false
    },

    date: {
        type: String,
        require: true
    },
})

const Tour = mongoose.model("Tour",TourSchema)
module.exports = Tour