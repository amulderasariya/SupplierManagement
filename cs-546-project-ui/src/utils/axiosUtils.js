import axios from 'axios';
import { get } from 'lodash';
const API_URL = 'http://localhost:8000/';

const postData = (url) => async (data) => {
  try {
    if (data.newURL) url = data.newURL;
    delete data.newURL;
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.post(API_URL + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.token) {
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error(JSON.stringify(get(e, 'response.data.errors', [{ msg: 'Something went wrong' }])));
  }
};

const getData = (url) => async (data) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(API_URL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...data,
    });
    if (response.data.token) {
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error(JSON.stringify(get(e, 'response.data.errors', [{ msg: 'Something went wrong' }])));
  }
};
const axiosUtils = { getData, postData };
export default axiosUtils;
