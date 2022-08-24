const express = require('express') 
const path = require('path')
const app = express(),
    bodyParser = require('body-parser')
const Server = require('./config')
PORT=5000

const sdk = require("node-appwrite")
let client = new sdk.Client()
let users = new sdk.Users(client)
let storage = new sdk.Storage(client)
let database = new sdk.Databases(client)

//init sdk
client
    .setEndpoint("Server.endpoint")
    .setProject("Server.project")
    .setKey("Server.secretKey")
//nbsp

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "../appwrite-app/build")))

//get user by ID
app.get("/v1/users/:id", (req, res) => {
    let promise = users.get(req.params.id)

    promise.then(
        function (response) {
            res.json(response)
        },
        function (response) {
            console.log(error)
        }
    )
})

//get user prefs
app.get("/v1/users/:userid/prefs", (req, res) => {
    let promise = users.getPrefs(req.params.userid)
    
    promise.then(
        function (response) {
            res.json(response)
        },
        function (response) {
            console.log(error)
        }
    )
})

//list collections
app.get("/v1/database/collections", (req, res) => {
    let promise = database.listCollections()
        
    promise.then(
        function (response) {
            res.json(response)
        },
        function (response) {
            console.log(error)
        }
    )
})

// create new bucket
app.post("/v1/storage/buckets", function (req, res) {
    let promise = storage.createBucket(
        req.body.bucketId,
        req.body.bucketName,
        "file"
    )
        
    promise.then(
        function (response) {
            res.json(response)
        },
        function (response) {
            console.log(error)
        }
    )
})

//get list of files in bucket
app.get("/v1/storage/buckets/:id/files", (req, res) => {
    let promise = storage.listFiles(req.params.id)
        
    promise.then(
        function (response) {
            res.json(response)
        },
        function (response) {
            console.log(error)
        }
    )
})

//delete bucket
app.delete("/v1/storage/buckets/:bucketId", (req, res) => {
    let promise = storage.deleteBucket(req.params.bucketId)
        
    promise.then(
        function (response) {
            res.json(response)
        },
        function (response) {
            console.log(error)
        }
    )
})
app.listen(PORT, () => {
    console.log(`Server is listenting on port: ` + PORT)
})