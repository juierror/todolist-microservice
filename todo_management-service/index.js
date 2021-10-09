const express = require("express")
const axios = require("axios")
const cors = require("cors")
const config = require("../config.json")

const app = express()
app.use(express.json())
app.use(cors())

app.post("/addtodo", (req, res) => {
    axios.post("http://mongo-service:3001/addtodo", {
        username: req.body.username,
        todo: req.body.todo
    }).then(data => {
        res.status(200).json(data.data)
    }).catch(err => {
        res.status(500).json({
            code: err.code,
            message: err.message,
        })
    })
})

app.get("/getalltodo", (req, res) => {
    axios.get("http://mongo-service:3001/getalltodo")
        .then(data => {
            res.status(200).json(data.data)
        }).catch(err => {
            res.status(500).json({
                code: err.code,
                message: err.message,
            })
        })
})

app.post("/gettodo", (req, res) => {
    if (!req.body || !req.body.username) {
        res.status(400).json({
            code: 'INVALID_REQUEST',
            message: 'Missing required field: username',
        })
    }
    axios.post("http://mongo-service:3001/gettodo", {
        username: req.body.username
    }).then((data) => {
        res.json(data.data.list)
    }).catch(err => {
        res.status(500).json({
            code: err.code,
            message: err.message,
        })
    })
})

app.post("/changestate", (req, res) => {
    axios.post("http://mongo-service:3001/changestate", {
        username: req.body.username,
        todo: req.body.todo
    }).then(data => {
        res.status(200).json(data.data)
    }).catch(err => {
        res.status(500).json({
            code: err.code,
            message: err.message,
        })
    })
})

app.listen(config.PORT.TODO_MANAGEMENT_SERVICE, () => {
    console.log(`Todo management service listening on port ${config.PORT.TODO_MANAGEMENT_SERVICE}`)
})
