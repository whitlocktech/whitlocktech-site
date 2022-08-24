const express = require("express");
const path = require("path");
const app = express(),
  bodyParser = require("body-parser");
port = 3080;

// Init SDK
const sdk = require("node-appwrite");
let client = new sdk.Client();
let users = new sdk.Users(client);
let storage = new sdk.Storage(client);
let database = new sdk.Databases(client);

client
  .setEndpoint("http://appwrite.whitlocktech.com/v1") // Your API Endpoint
  .setProject("630100eef1bdfc27d173") // Your project ID
  .setKey(
    "1372342d81428b35110a6a71fcde51d6a689ca8d167527cf8e6ae0e78e931845a1f850604cbd0052c00099529aea2754a64b7d25f8650e15c425d586d77d76dc0d1b00d4e7872c7659937be8688a6e0312255377a3a9bad354d106501aa8760e7b0ea3383a5347f44a40a46db03a6c873c0898b1c3bb7e7233088f1a7ae821b6"
  ); // Your secret API key

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../appwrite-app/build")));

//get user by ID
app.get("/v1/users/:id", (req, res) => {
  let promise = users.get(req.params.id);

  promise.then(
    function (response) {
      res.json(response);
    },
    function (error) {
      console.log(error);
    }
  );
});

//get user by ID
app.get("/v1/users/:userid/prefs", (req, res) => {
  let promise = users.getPrefs(req.params.userid);

  promise.then(
    function (response) {
      res.json(response);
    },
    function (error) {
      console.log(error);
    }
  );
});

// List collections
app.get("/v1/database/collections", (req, res) => {
  let promise = database.listCollections();

  promise.then(
    function (response) {
      res.json(response);
    },
    function (error) {
      res.json(error);
    }
  );
});

// create new bucket
app.post("/v1/storage/buckets", function (req, res) {
  let promise = storage.createBucket(
    req.body.bucketId,
    req.body.bucketName,
    "file"
  );

  promise.then(
    function (response) {
      res.json(response);
    },
    function (error) {
      console.log(error);
    }
  );
});

//get list of files in bucket
app.get("/v1/storage/buckets/:id/files", (req, res) => {
  let promise = storage.listFiles(req.params.id);

  promise.then(
    function (response) {
      res.json(response);
    },
    function (error) {
      res.json(error);
    }
  );
});

//Delete Bucket
app.delete("/v1/storage/buckets/:bucketId", (req, res) => {
  let promise = storage.deleteBucket(req.params.bucketId);

  promise.then(
    function (response) {
      res.json(response);
    },
    function (error) {
      console.log(error);
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});