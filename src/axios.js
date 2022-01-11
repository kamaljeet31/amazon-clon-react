import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://us-central1-challenge-173bc.cloudfunctions.net/api',
})

export default instance
