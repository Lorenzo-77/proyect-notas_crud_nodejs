const  {Router} = require('express');
const router = Router();

const { renderNoteFrom, createNewNote, 
        renderNotes, renderEditFrom, 
        updateNote, deleteNote, }  = require('../controllers/note.controller');

//new note
router.get('/notes/add', renderNoteFrom);
router.post('/notes/new-note', createNewNote);

//get notes
router.get('/notes', renderNotes);

// Edit Notes
router.get('/notes/edit/:id', renderEditFrom);
router.put('/notes/edit/:id', updateNote);

// delate notes
router.delete('/notes/delete/:id', deleteNote);








module.exports = router;