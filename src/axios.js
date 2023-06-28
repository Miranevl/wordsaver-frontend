import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://wordsaver-pyroject-488fda2b8133.herokuapp.com',
})

export default instance;