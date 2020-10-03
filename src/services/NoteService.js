import httpservice from './Httpservice';

class NoteService{
    addNote(data){
        return httpservice.post('notes/addNotes',data)
    }
    
    fetchNotesList(){
        return httpservice.get('notes/getNotesList')
    }
    
    moveToTrash(trashData){
        return httpservice.post('notes/trashNotes',trashData)
    }
    
    fetchTrashNotesList(){
        return httpservice.get('notes/getTrashNotesList')
    }
    
    deleteForever(noteId){
        return httpservice.post('notes/deleteForeverNotes',noteId)
    }
    
    restoreTrashNotes(noteData){
        return httpservice.post('notes/trashNotes',noteData)
    }

    updateNotes(updateData){
        return httpservice.post('notes/updateNotes',updateData)
    }

    archiveNotes(archiveData){
        return httpservice.post('notes/archiveNotes',archiveData)
    }

    fetchArchiveNotes(){
        return httpservice.get('notes/getArchiveNotesList')
    }
}

export default new NoteService
