import axios from 'axios';

const URL = process.env.VUE_APP_BACKEND_URL

export default {
    post(path,DTO) {
        return axios({
            method: 'post',
            url: `${URL}/${path}`,
            data: DTO,  
            headers: {
                'Content-Type': 'application/json',
                'Authorization':localStorage.getItem('token')
            }       
        })
    },

    get(path){
        return axios({
            method:'get',
            url:`${URL}/${path}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization':localStorage.getItem('token')
            } 
        })
    }
}