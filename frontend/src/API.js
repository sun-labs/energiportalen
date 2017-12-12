import axios from 'axios';
import { API_URL } from './Splash/assets/APIRoutes';

const CACHE_LIFE = 1;//24 * 60 * 60 // 24 hours
const token = getToken()

let api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Authorization: token
  }
})


// function store(key, val) {
//   if(localStorage) {
//     const obj = { stored: Date.now(), val }
//     localStorage.setItem(key, JSON.stringify(obj))
//     return true;
//   }
//   return false;
// }

function get(key) {
  if(localStorage) {
    const val = JSON.parse(localStorage.getItem(key))
    if(val) {
      const age = (Date.now() - val.stored) / 1000;
      if(age < CACHE_LIFE) {
        return val.val
      }
    }
  }
  return undefined;
}

function call(method, url, data, cb) {
  method = method.toUpperCase()
  const key = `${method}-${url}-${data}`;
  const cached = get(key);
  if(/*cached*/false) {
    cb(cached)
  } else {
    api.request({
      method,
      url,
      data,
    })
    .then((res) => { // TODO do not store complete request object, store data.
      // store(key, res);
      cb(res);
    });
  }

}

function getToken() {
  return localStorage.getItem('token');
}

function getLocations(params, cb) {
  call('GET', '/locations/', undefined, cb)
}

const getDataFromKey = (params, cb) => {
  const {
    from,
    to,
    interval,
    unitId,
    keyId
  } = params;
  const PARAMETERS = `date[from]=${from}&date[to]=${to}&interval=${interval}`;
  call('GET', `/units/${unitId}/${keyId}?${PARAMETERS}`, undefined, cb)
}

function getUnitsFromLocation(locationId, cb) {
  call('GET', `locations/${locationId}/units`, undefined, cb)
}

function getKeysFromUnit(unitId, cb) {
  call('GET', `units/${unitId}/`, undefined, cb);
}

const funcs = {
  apiCall: () => api,
  getToken,
  getDataFromKey,
  getLocations,
  getUnitsFromLocation,
  getKeysFromUnit,
};

export default funcs;