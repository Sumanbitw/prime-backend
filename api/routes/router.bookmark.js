const express = require("express")
const bookmarkVideos = require("../models/bookmark.model")
const mongoose = require("mongoose")
const router = express.Router()

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
        const newVideos = new bookmarkVideos(req.body)
        const savedVideos = await newVideos.save()
        res.status(201).json({ video : savedVideos, success:true, message : "Added in bookmark list" })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Failed to add videos",
            error : error
        })
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