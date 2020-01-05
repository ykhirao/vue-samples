require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var cloudinary = require('cloudinary').v2
const uuid = require('uuid');

const { cloud_name, api_key, api_secret } = process.env;

app.use(bodyParser());

app.get("/", function (req, res) {
  res.send("HelloWorld");
});

app.post("/canvas", function (req, res) {
  const base64 = req.body.base64;

  const public_id = `ogp/${uuid.v4()}`

  cloudinary.uploader.upload(base64,
    { cloud_name, api_key, api_secret, public_id },
    function (error, result) { console.log(result, error) });

  res.send("OK");
});

// app.get("/canvas", function (req, res) {
//   console.log('canvas fire');
//   res.send("HelloWorld");
// });

// app.get("/test", function (req, res) {
//   res.json({ message: "test" })
// })

module.exports = {
  path: "/api/",
  handler: app
};
