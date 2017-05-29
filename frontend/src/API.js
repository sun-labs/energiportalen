import axios from 'axios';
import { API_URL } from './Splash/assets/APIRoutes';

const funcs = {
  getToken: () => {
    return localStorage.getItem('token');
  },
  apiCall: () => {
    return axios.create({
      baseURL: API_URL,
      timeout: 15000,
      headers: {
        Authorization: funcs.getToken()
      }
    });
  },
  getDataFromKey: (params, cb) => {
    const PARAM_FROM = 'date[from]'; // this will send a javascript object to backend like: date { from: data }
    const PARAM_TO = 'date[to]';
    const PARAM_INT = 'interval';
    const {
      from,
      to,
      interval
    } = params;
    const PARAMETERS = `${PARAM_FROM}=${from}&${PARAM_TO}=${to}&${PARAM_INT}=${interval}`;
    funcs.apiCall().get(`/units/${params.unitId}/${params.keyId}?${PARAMETERS}`)
      .then((res) => {
        cb(res);
      });
  },
  getLocations: (params, cb) => {
    funcs.apiCall().get('/locations/')
      .then((res) => {
        cb(res);
      });
  }
};

export default funcs;