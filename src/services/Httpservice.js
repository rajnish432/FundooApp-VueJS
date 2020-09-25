import axios from 'axios';

const URL = process.env.VUE_APP_BACKEND_URL

export default {
    post(login,DTO) {
        return axios({
            method: 'post',
            url: `${URL}/${login}`,
            data: DTO,
        })
    },
}