const HOST = 'localhost:4000';
const VERSION = 1;
const SECURE = false;
const PROTOCOL = SECURE ? 'https' : 'http';

const URL = `${PROTOCOL}://${HOST}`;
export const URL_TERMS = `${URL}/terms`;

const API_URL = `${URL}/${VERSION}`; 
export const API_AUTH = `${API_URL}/auth`;
export const API_CHECK_TOKEN = `${API_AUTH}/check`;
export const API_SIGNUP = `${API_AUTH}/signup`;
export const API_FORGOT_PASSWORD = `${API_AUTH}/forgot`;