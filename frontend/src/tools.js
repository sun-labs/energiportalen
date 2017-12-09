import * as blockConstants from './constants/blockConstants';

const c = {
  ...blockConstants
};

export const isLeapYear = (year) => {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

export const daysOfYear = (year) => {
  return isLeapYear(year) ? 366 : 365;
}

export const daysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
}

export const dateToString = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0!
  const yyyy = date.getFullYear();

  if (dd < 10) {
      dd = '0' + dd;
  }

  if (mm < 10) {
      mm = '0' + mm;
  }

  return yyyy + '-' + mm + '-' + dd;
}

export const getDatesFromInterval = (interval = '24h') => {

  let today = new Date();
  let prevDate = new Date();

  switch (interval) {
    default:
    case c.RAW:
    case c.HOUR:
    case c.DAY:
      prevDate.setDate(prevDate.getDate() - 1);
      break;
    case c.MONTH:
      prevDate.setDate(prevDate.getDate() - daysInMonth(today));
      break;
    case c.WEEK:
      prevDate.setDate(prevDate.getDate() - 7);
      break;
    case c.YEAR:
      prevDate.setDate(prevDate.getDate() - daysOfYear(today.getFullYear()));
      break;
    case c.ALL_TIME:
      break;
  }

  return { from: dateToString(prevDate), to: dateToString(today)};

}