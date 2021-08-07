const express = require("express")
const bookmarkVideos = require("../models/bookmark.model")
const mongoose = require("mongoose")
const router = express.Router()
const Video = require("../models/video.model")

router.get("/:userId", async ( req,res ) => {
    try {
        const { userId } = req.params
        const userVideos = await bookmarkVideos.find({ user : {_id : userId } }).populate('video').exec();
        res.json({ video : userVideos, success : true, message : "Videos fetched" })
    } catch ( err ) {
        res.json({ message : err, success : false, message : " Failed to fetch videos" })
    }  
})

router.post("/", async (req,res) => {
    try {
        const video = new bookmarkVideos(req.body)
        const newVideo = await video.save()
        res.json({ success : true, message : "Bookmark videos created", bookmark : newVideo })
    }catch(error){
        res.json({ success : false, message : "Bookmark videos cannot be created", error : error})
    }

})

router.delete("/:userId/:videoId", async (req, res) => {
    const { userId, videoId } = req.params
    try {
        const removedBookmarkVideos = await bookmarkVideos.remove({ user : userId, videoId : videoId })
        console.log(removedBookmarkVideos)
        res.json({ success : true, message : "Videos removed", removedBookmarkVideos : removedBookmarkVideos })
    }catch(error){
        res.json({
            success : false,
            message : "Error while removing videos"
        })
    }
})

module.exports = router