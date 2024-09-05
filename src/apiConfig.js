// src/apiConfig.js

let API_BASE_URL;

if (window.location.hostname === 'localhost') {

  API_BASE_URL = 'http://localhost:5000/api';
} else {

  API_BASE_URL = 'https://main--chen-to-do-app.netlify.app/';
}

export default API_BASE_URL;
