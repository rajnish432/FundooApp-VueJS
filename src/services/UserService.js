import httpservice from './Httpservice';

class UserService {

    getUserLoggedIn(loginData) {
        return httpservice.post(`user/login`,loginData)
    }

    addNote(data){
        return httpservice.post('notes/addNotes',data)
    }
}

export default new UserService