import axios from 'axios';

const service = ( () => {

    const api = axios.create({
        baseURL: 'http://localhost:8080/'
    });

    return api;

})();

export default service;