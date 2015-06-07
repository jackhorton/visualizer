"use strict";

const express = require("express");
const app = express();

app.use("/public", express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.get("/connect", function(req, res) {
    res.sendFile(__dirname + "/connect.html");
});

app.listen(8000, function() {
    console.log("Started server");
});
