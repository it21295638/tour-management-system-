const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    efficiency:Number,
    speed:Number,
    friendliness:Number,
    overall:Number,
    comments:String,
});

module.exports = mongoose.model('Posts',postSchema);