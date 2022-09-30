const express = require("express");
const path = require("path");
let newNotes = require("./db/db.json")
const {uid} = require('uid')
const fs = require('fs')
// const api = require("./routes/api/index");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api", api);

app.get("/", function(req, res) {
{ res.sendFile(path.join(__dirname, "public", "index.html"))}
})


app.get("/notes", function(req, res) {
	res.sendFile(path.join(__dirname, "public","notes.html"));}
)

app.get ('*' , function (req,res) {
	res.json(newNotes)})

app.post ('/api/notes' , (req,res) => {
	console.log(req.res)
	let noteContent= {
		title: req.body.title,
		text:req.body.text,
		id:uid()

	}
	
	newNotes.push(noteContent)
	res.json(200)})

	app.delete("/api/notes/:id", function(req, res) {
		newNotes.splice(req.params.id, 1);
		updateDb();
		
	});

app.listen(PORT, () =>
	console.log(`Listening at http://localhost:${PORT}`)
);