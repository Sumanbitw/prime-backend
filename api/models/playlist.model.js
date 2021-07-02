const mongoose = require('mongoose')

const PlaylistSchema = new mongoose.Schema({
    user : { type : mongoose.Schema.Types.ObjectId, ref : "User" },
    name : { type :String, required : true },
    videos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Video"
    }]
})

module.exports = mongoose.model('Playlist', PlaylistSchema)