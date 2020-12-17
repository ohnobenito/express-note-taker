//Require Dependencies 
const fs = require("fs");
const express = require("express");
const path = require("path");

//Setting up Express app
const app = express();
const PORT = process.env.PORT || 3030;

//PATHS
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
    //Saved Notes from database 
    let savedNotes = JSON.parse(fs.readFileSync(database));
    //Should receive a new note to save on request body
    let newNote = req.body;
    //Take length of saved notes string to create a new id
    let noteId = (savedNotes.length).toString();
    newNote.id = noteId;
    //push new note to saved
    savedNotes.push(newNote);
    //Should be returned back to the client
    console.log(newNote);
    fs.writeFileSync(database, JSON.stringify(savedNotes));
    res.json(savedNotes);
});

app.delete("/api/notes/:id", function(req,res) {
    //Saved Notes from database
    let savedNotes = JSON.parse(fs.readFileSync(database));
    // Require params of noteId
    let noteId = req.params.id;
    //give newIdNum an id of 0
    let newIdNum = 0;
    console.log(`Delete button pressed for id: ${noteId}`)

    //.filter through array
    savedNotes = savedNotes.filter(activeNote => {
        return activeNote.id != noteId;;
    })
    //run for of loop that goes through savedNotes and changes ids
    for (let activeNote of savedNotes) {
        activeNote.id = newIdNum.toString();
        newIdNum++;
    }
    //write file
    fs.writeFileSync(database, JSON.stringify(savedNotes));
    res.json(savedNotes);
 
});

//Should return the index.html file
app.get("*", function(req, res) {
    res.sendFile(path.join(directory, "index.html"))
});

// Starting the server to listen
app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);
});