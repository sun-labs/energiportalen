import axios from 'axios';
import { API_URL } from './Splash/assets/APIRoutes';
import config from './config';

const CACHE_LIFE = config.cache.duration; //24 * 60 * 60 // 24 hours
const CACHE_PREFIX = config.cache.prefix;
const token = getToken()

cleanCache() // every reload

let api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Authorization: token
  }
})

function cacheKey(key) {
  return `${CACHE_PREFIX}-${key}`;
}

// store value in cache
function store(key, val) {
  key = cacheKey(key);
  const obj = { stored: Date.now(), val }
  const cachedObj = JSON.stringify(obj);
  if(localStorage) {
    localStorage.setItem(key, cachedObj)
    return true;
  }
  return false;
}

// get cached object value
function get(key) {
  key = cacheKey(key);
  const obj = _get(key);
  if(obj && !_isOld(obj)) {
    return obj.val
  }
  return undefined;
}

// get raw cache object
function _get(key) {
  let data = undefined;
  if(localStorage) {
    data = localStorage.getItem(key);
  }
  return JSON.parse(data);
}

// remove items 
function _remove(key) {
  if (localStorage) {
    localStorage.removeItem(key);
    return true;
  }
  return false;
}

// check if cached obj is old => true
function _isOld(obj) {
  const age = (Date.now() - obj.stored) / 1000;
  return age < CACHE_LIFE;
}

// loop though all the cached items and remove old ones
function cleanCache() {
  const cached = Object.keys(localStorage).filter((key) => (key.indexOf(CACHE_PREFIX) > -1));
  cached.forEach((item) => {
    const obj = _get(item);
    if(_isOld(obj)) {
      _remove(item);
    }
  })
}

function call(method, url, data, cb) {
  method = method.toUpperCase()
  const key = `${method}-${url}-${data}`;
  const cached = get(key);
  if(cached) {
    cb(cached)
  } else {
    api.request({
      method,
      url,
      data,
    })
    .then((res) => { // TODO: do not store complete request object, store data.
      store(key, res);
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