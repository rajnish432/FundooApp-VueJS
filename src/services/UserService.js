import httpservice from './Httpservice';

class UserService {

    getUserLoggedIn(loginData) {
        return httpservice.post(`user/login`,loginData)
    }

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
}

export default new UserService