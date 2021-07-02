const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const port = process.env.PORT || 3020
const videoRoute = require('./api/routes/router.video')
const playlistRoute = require("./api/routes/router.playlist")
const signupRoute = require("./api/routes/signup.router")
const loginRoute = require("./api/routes/login.router")
const bookmarkRoute  = require("./api/routes/router.bookmark")
const watchlaterRoute = require("./api/routes/router.watchlater")


mongoose.connect("mongodb+srv://reach2suman:suman-neoG@cluster0.repe4.mongodb.net/test",
    {
        useNewUrlParser : true,
        useUnifiedTopology: true
    },
    console.log("connected to db")
)
app.use(express.urlencoded({extended :true}))
app.use(express.json())
app.use(cors())

app.use('/videos', videoRoute)
app.use('/playlists', playlistRoute)
app.use("/signup", signupRoute)
app.use("/login", loginRoute)
app.use("/bookmark", bookmarkRoute)
app.use("watchlater", watchlaterRoute)

app.get('/', (req,res) => {
    res.status(200).json({ message : "Prime backend" })
})

app.listen(port)