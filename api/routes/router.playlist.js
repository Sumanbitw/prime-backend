const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const Playlist = require("../models/playlist.model")
const Video = require("../models/video.model")

router.post("/", async (req, res) => {
    try {
        const playlist = new Playlist(req.body)
        const newPlaylist = await playlist.save()
        res.json({ success : true, message : "Playlist created", playlist : newPlaylist })
    }catch(error){
        res.json({ success : false, message : "Playlist cannot be created", error : error})
    }
})

router.get("/:userId" , async(req, res) => {
    const { userId } = req.params
    try {
        const playlist = await Playlist.find({ user : userId }).populate("Video").exec()
        res.json({ success : true, message : "Successfully fetched playlist", playlist : playlist })
    }catch(error){
        res.json({ success : false, message : "Cannot get the desired playlist", error : error })
    }
})

router.post("/:userId/:playlistId", async( req, res) => {
    const { userId, playlistId } = req.params
    const { videoId } = req.body
    const playlist = await Playlist.find({ user : userId, _id : playlistId })
    const isVideoInPlaylist = playlist.videos.includes(videoId)
    try{
        if(!isVideoInPlaylist){
            const videoAddedInPlaylist = playlist.videos.push(videoId) 
            const updatedPlaylist = await videoAddedInPlaylist.save()
            res.json({ success : true, message : "Video added in playlist ", playlist : updatedPlaylist})
        }
    }catch(error){
        res.json({ success : false, messgae : "Cannot add videos in playlist", error : error })
    }
})

router.delete("/:userId/:playlistId", async(req, res) => {
    const { userId, playlistId } = req.params
    try{
        const removedPlaylist = await Playlist.deleteOne({ user : userId })
        res.json({ success : true, message : "Playlist removed", playlist : removedPlaylist })
    }catch(error) {
        res.json({ success : false, message : "Unable to delete playlist", error : error })
    }
})

router.delete("/:userId/:playlistId", async(req, res) => {
    const { userId, playlistId } = req.params
    const { videoId } = req.body 
    try{
        const playlist = await Playlist.find({ user : userId, playlist : playlistId })
        const isVideoInPlaylist = playlist.videos.includes(videoId)
        const removedVideos = await isVideoInPlaylist.deleteOne()
        res.json({ success : true, message : "Video removed", playlist : removedVideos })
    }catch(error) {
        res.json({ success : false, message : "Unable to delete playlist", error : error })
    }
})

router.patch("/:userId/:playlistId", async (req, res) => {
    const { userId, playlistId } = req.params
    const { newName } = req.body
    try {
        const updatePlaylistName = await cartModels.updateOne({ user : userId, playlist : playlistId }, { $set : { name : newName }})
        console.log(updatePlaylistName)
        res.json({ success : true, message : "Playlisty name updated", updatePlaylistName : updatePlaylistName })
    }catch(error){
        res.json({
            success : false,
            message : "Error while updating the playlist name",
            error : error
        })
    }
})
module.exports = router