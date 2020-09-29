import httpservice from './Httpservice';

class UserService {

    getUserLoggedIn(loginData) {
        return httpservice.post(`user/login`,loginData)
    }
}

export default new UserService