const notesCtrl = {};

const Note =  require('../models/Note');

notesCtrl.renderNoteFrom = (req, res) =>{
    res.render('notes/new-notes');
}

notesCtrl.createNewNote = async (req, res) =>{
    //console.log(req.body);
    const { title, description } = req.body;
    const newNote = Note({title, description});
    await newNote.save();
    req.flash('success_msg', 'Nota Agregada');
    res.redirect('/notes');
}

notesCtrl.renderNotes = async(req, res)=>{ //realiza la consulta en la base de datos
    const notes = await Note.find().lean();  // para leer los archivos
    res.render('notes/all-notes',{ notes });
}

notesCtrl.renderEditFrom = async(req, res)=>{
    const note =await Note.findById(req.params.id).lean();
    res.render('notes/edit-note',{ note });
}

notesCtrl.updateNote = async(req, res)=>{
    const {title, description}= req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description});
    req.flash('success_msg','Nota Actualizada');
    res.redirect('/notes');
}

notesCtrl.deleteNote = async (req, res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota Eliminada');
    res.redirect('/notes');
}






module.exports = notesCtrl;