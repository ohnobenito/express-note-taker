//Require Dependencies 
const http = require("http");
const fs = require("fs");
const express = require("express");
const path = require("path");

//Setting up Express app
const app = express();
const port = 3030;


//Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname/public, "notes.html"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname/public, "index.html"))
});
