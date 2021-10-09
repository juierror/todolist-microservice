const express = require("express")
const axios = require("axios")
const cors = require("cors")
const config = require("../config.json")

const app = express()
app.use(express.json())
app.use(cors())

app.post("/adduser", (req, res) => {
    console.log(req.body)
    axios.post("http://mongo-service:3001/adduser", {
        username: req.body.username
    })
    res.status(200).end()
})

app.get("/getalluser", (req, res) => {
    axios.get("http://mongo-service:3001/getalluser").then((data) => {
        res.json(data.data)
    })
})

app.listen(config.PORT.USER_SERVICE, () => {
    console.log(`User service listening on port ${config.PORT.USER_SERVICE}`)
})
