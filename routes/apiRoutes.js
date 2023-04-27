const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const db = require('../db/db.json')

router.get("/notes", (req, res) => {
    res.json(db)
})

router.post('/notes', (req, res) => {
    const noteToCreate = createNote(req.body, db)
    res.json(noteToCreate)
})

const createNote = (body, currentNotes) => {
    if(!currentNotes) {
        currentNotes = []
    }

    body.id = currentNotes.length
    currentNotes.push(body)

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(currentNotes, null, 2)
    )
    return body
}

router.delete("/notes/:id", (req, res) => {
    deleteNote(req.params.id, db)
    res.json(true)
})

const deleteNote = (id, currentNotes) => {
    for(let i = 0; i < currentNotes.length; i++) {
        if(currentNotes[i].id == id) {
            currentNotes.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(currentNotes, null, 2)
            )
            break;
        }
    }
}

module.exports = router