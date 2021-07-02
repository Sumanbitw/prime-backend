const mongoose = require(mongoose)

const bookmarkSchema = new mongoose.Schema({
    user : { type : mongoose.Schema.Types.ObjectId, ref : "User" },
    video : { type : mongoose.Schema.Types.ObjectId, ref : "Video"}
}, { timestamps : true }
)

module.exports = mongoose.model("Bookmark", bookmarkSchema)