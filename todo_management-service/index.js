const express = require("express")
const axios = require("axios")
const cors = require("cors")
const config = require("../config.json")

const app = express()
app.use(express.json())
app.use(cors())

app.post("/todo", (req, res) => {
    axios.post(`http://localhost:${config.PORT.MONGO_SERVICE}/todo`, {
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

app.post("/removeToDo", (req, res) => {
    axios.post(`http://localhost:${config.PORT.MONGO_SERVICE}/todo`, {
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

app.get("/all-todo", (req, res) => {
    axios.get(`http://localhost:${config.PORT.MONGO_SERVICE}/all-todo`)
        .then(data => {
            res.status(200).json(data.data)
        }).catch(err => {
            res.status(500).json({
                code: err.code,
                message: err.message,
            })
        })
})

app.get("/todo", (req, res) => {
    axios.get(`http://localhost:${config.PORT.MONGO_SERVICE}/todo?${req.query.username}`)
        .then((data) => {
            res.json(data.data.list)
        })
        .catch(err => {
            res.status(500).json({
                code: err.code,
                message: err.message,
            })
        })
})

app.post("/change-state", (req, res) => {
    axios.post(`http://localhost:${config.PORT.MONGO_SERVICE}/change-state`, {
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
