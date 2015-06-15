"use strict";

const express = require("express");
const app = express();

// TODO: take this out for production
app.use(express.static("src"));
app.use("/css/lib", express.static("src/lib"));
app.use("/css", express.static("public/css"));

app.get("/connect", function(req, res) {
    res.sendFile(__dirname + "/connect.html");
});
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8000, function() {
    console.log("Started server");
});
