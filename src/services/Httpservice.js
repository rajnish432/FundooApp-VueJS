import axios from 'axios';

const URL = 'http://fundoonotes.incubation.bridgelabz.com/api/user/login'

export default {
    post(DTO) {
        return axios({
            method: 'post',
            url: `${URL}`,
            data: DTO,
        })
    },
}