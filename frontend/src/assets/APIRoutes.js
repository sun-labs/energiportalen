const HOST = 'sunlabs.se';
const VERSION = 1;
const SECURE = false;
const PROTOCOL = SECURE ? 'https' : 'http';


const API_URL = `${PROTOCOL}://${HOST}/${VERSION}`;
export const API_AUTH = `${API_URL}/auth`;
export const API_SIGNUP = `${API_URL}/signup`;
export const API_FORGOT_PASSWORD = `${API_URL}/forgot`;