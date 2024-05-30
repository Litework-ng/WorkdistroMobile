import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://workdistro-mqpp.onrender.com/api/',
  timeout: 30000, // Adjust timeout as needed
  headers: {
    'Content-Type': 'application/json',
    // You can add other default headers here
  }
});

export default instance;
