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
        res.json(data.data)
    })
})

app.get("/getalltodo", (req, res) => {
    axios.get("http://mongo-service:3001/getalltodo").then((data) => {
        res.json(data.data)
    })
})

app.post("/gettodo", (req, res) => {
    axios.post("http://mongo-service:3001/gettodo", {
        username: req.body.username
    }).then((data) => {
        res.json(data.data.list)
    })
})

app.post("/changestate", (req, res) => {
    axios.post("http://mongo-service:3001/changestate", {
        username: req.body.username,
        todo: req.body.todo
    }).then(data => {
        res.json(data.data)
    })
})

app.listen(config.PORT.TODO_MANAGEMENT_SERVICE, () => {
    console.log(`Todo management service listening on port ${config.PORT.TODO_MANAGEMENT_SERVICE}`)
})
