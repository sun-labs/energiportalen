export const FETCH_SUM_VALUE_DATA_SUCCESS = 'FETCH_SUM_VALUE_DATA_SUCCESS';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const TOGGLE_ADD_BLOCK = 'TOGGLE_ADD_BLOCK';
export const ADD_TABLE_BLOCK_ROW = 'ADD_TABLE_BLOCK_ROW';
export const TOGGLE_EDIT_BLOCK = 'TOGGLE_EDIT_BLOCK';

export const PHONE = 'PHONE';
export const TABLE = 'TABLE';
export const SCOOTER = 'SCOOTER';
export const LINE = 'LINE';

export const LOCATION = 'LOCATION';
export const UNIT = 'UNIT';
export const KEY = 'KEY';
export const INTERVAL = 'INTERVAL';
export const DATE_FROM = 'DATE_FROM';
export const DATE_TO = 'DATE_TO';
export const BLOCK_TYPE = 'BLOCK_TYPE';
export const SAVE_BLOCK = 'SAVE_BLOCK';
export const SAVE_NEW_BLOCK = 'SAVE_NEW_BLOCK';

export const RAW = 'RAW';
export const HOUR = 'HOUR';
export const DAY = 'DAY';
export const MONTH = 'MONTH';
export const YEAR = 'YEAR';

export const typeOptions = [
  { value: LINE, label: 'Line Chart' },
  { value: TABLE, label: 'Table Chart' },
  { value: PHONE, label: 'Smartphone charges' },
  { value: SCOOTER, label: 'Scooter thingy' }
];

export const intervalOptions = [
  { value: RAW, label: '5 sec' },
  { value: HOUR, label: '1h' },
  { value: DAY, label: '24h' },
  { value: MONTH, label: '7d' },
  { value: YEAR, label: '365d' }
];