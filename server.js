//Require Dependencies 
const http = require("http");
const fs = require("fs");
const express = require("express");
const path = require("path");

//Setting up Express app
const app = express();
const port = 3030;


//HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname/public, "notes.html"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname/public, "index.html"))
});

//API Routes

app.get("/api/notes", function(req, res) {

});

app.post("/api/notes", function(req,res) {

});

app.delete("/api/notes/:id", function(req,res) {

});


// Starting the server to listen
app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);
})