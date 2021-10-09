const express = require("express")
const axios = require("axios")
const cors = require("cors")
const config = require("../config.json")

const app = express()
app.use(express.json())
app.use(cors())

app.post("/adduser", (req, res) => {
    if (!req.body || !req.body.username) {
        res.status(400).json({
            code: 'INVALID_REQUEST',
            message: 'Missing required field: username',
        })
    }
    axios.post("http://mongo-service:3001/adduser", {
        username: req.body.username
    }).then(() => {
        res.status(204).end()
    }).catch(err => {
        res.status(500).json({
            code: err.code,
            message: err.message,
        })
    })
})

app.get("/getalluser", (req, res) => {
    axios.get("http://mongo-service:3001/getalluser")
        .then((data) => {
            res.json(data.data)
        })
})

app.listen(config.PORT.USER_SERVICE, () => {
    console.log(`User service listening on port ${config.PORT.USER_SERVICE}`)
})
