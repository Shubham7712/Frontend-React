/* eslint-disable */
import axios from 'axios';

const api = axios.create({
    // baseURL: "http://5.189.147.159:9501/",
     baseURL: "http://localhost:5000/",

    headers: {
        'Content-Type': 'application/json'
    }
});
export default api;
