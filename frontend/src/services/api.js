import axios from 'axios';
const token = localStorage.getItem('@scm:token')

const api = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
console.log(token);

export default api;
