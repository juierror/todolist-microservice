const express = require("express")
const axios = require("axios")
const cors = require("cors")
const config = require("../config.json")

const app = express()
app.use(express.json())
app.use(cors())

app.post("/user", (req, res) => {
    console.log(req.body)
    if (!req.body || !req.body.username) {
        res.status(400).json({
            code: 'INVALID_REQUEST',
            message: 'Missing required field: username',
        })
    }
    axios.post(`http://localhost:${config.PORT.MONGO_SERVICE}/user`, {
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

app.get("/users", (req, res) => {
    axios.get(`http://localhost:${config.PORT.MONGO_SERVICE}/users`)
        .then(data => {
            res.json(data.data)
        })
        .catch(err => {
            res.status(500).json({
                code: err.code,
                message: err.message,
            })
        })
})

app.listen(config.PORT.USER_SERVICE, () => {
    console.log(`User service listening on port ${config.PORT.USER_SERVICE}`)
})
