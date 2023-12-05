import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import axios from 'axios';

const hostname = window && window.location && window.location.hostname;

let apiEndpoint = 'http://0.0.0.0';
if (hostname === 'myway.01solutions.co.uk') {
  apiEndpoint = 'https://myway-api.01solutions.co.uk';
} 

console.log('apiEndpoint', apiEndpoint)
axios.defaults.baseURL = apiEndpoint;

//axios.defaults.baseURL = 'https://myway-api.01solutions.co.uk';
//axios.defaults.baseURL = 'http://0.0.0.0';

//axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(request => {
    // console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);