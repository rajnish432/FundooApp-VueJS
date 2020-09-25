import httpservice from './Httpservice';

class FundooService {

    getUserLoggedIn(loginData) {
        return httpservice.post(loginData)
    }
}

export default new FundooService