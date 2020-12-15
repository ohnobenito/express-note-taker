//Require Dependencies 
const http = require("http");
const fs = require("fs");
const express = require("express");
const path = require("path");

//Setting up Express app
const app = express();
const PORT = 3030;

const directory = path.join(__dirname, "/public");
const database = path.join(__dirname, "/db/db.json");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//tells server to find static files here when looking for linked content
app.use(express.static(directory));

//HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(directory, "notes.html"))
});


//API Routes

app.get("/api/notes", function(req, res) {
    //Should read the DB file and return notes back as JSON
    res.sendFile(database);
});

app.post("/api/notes", function(req,res) {
    //Should receive a new note to save on request body
    let newNote = req.body;

    //Should be returned back to the client
    console.log(newNote);
    res.json(newNote);
});

app.delete("/api/notes/:id", function(req,res) {

});

app.get("*", function(req, res) {
    res.sendFile(path.join(directory, "index.html"))
});

// Starting the server to listen
app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);
})