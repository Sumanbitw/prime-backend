const mongoose = require('mongoose')

const VideoSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    videoId : { type : String, required : true },
    categories : [{ type : String }],
    channelName : { type : String, required : true },
    imageURL : { type : String, required : true },
    title : { type :String, required : true },
    description : { type : String, required : true },
    publishedDate : { type : String, required : true },
    subscribers : { type : Number, required : "Cannot add without subscribers" },
    views : { type : Number, required : true },
    thumbnailImageURL : { type : String, required : true }
}, 
    { timestamps : true })

module.exports = mongoose.model('Video', VideoSchema)