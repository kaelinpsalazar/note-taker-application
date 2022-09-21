const express = require("express");
const path = require("path");
let notes = require("./db/db.json")
const {uid} = require('uid')
// const api = require("./routes/api/index");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api", api);

app.get("/", (req, res) =>
{ res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/notes", (req, res) =>
	res.sendFile(path.join(__dirname, "public","notes.html"))
);
app.get ('/api/notes' , (req,res) => {
	res.json(notes)})
app.post ('/api/notes' , (req,res) => {
	let note = {
		title: req.body.title,
		text:req.body.text,
		id:uid()

	}
	notes.push(note)
	res.json(200)})

	app.delete("/api/notes/:id", (req,res) => {
		notes=notes.filter(note => note.id !== req.params.id)
			res.json(notes)


	})

app.listen(PORT, () =>
	console.log(`Listening at http://localhost:${PORT}`)
);