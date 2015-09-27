"use strict";

// allow full es6/es7 support elsewhere
require('babel/register');

// sad commonjs required for entry file
const express = require("express");
const app = express();

app.use('/dist', express.static('dist'));
app.use('/songs', express.static('songs'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8000, () => {
    console.log("Started server");
});
