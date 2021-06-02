const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const port = process.env.PORT || 3000
const videoRoute = require('./api/routes/router.video')

mongoose.connect("mongodb+srv://reach2suman:suman-neoG@cluster0.repe4.mongodb.net/test",
    {
        useNewUrlParser : true,
        useUnifiedTopology: true
    }
)
app.use(express.urlencoded({extended :true}))
app.use(express.json())
app.use(cors())

app.use('/videos', videoRoute)

app.get('/', (req,res) => {
    res.status(200).json({ message : "Prime backend" })
})

app.listen(port)