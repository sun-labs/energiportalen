import API from '../../API';
import {
  FETCH_DATA_SUCCESS
} from '../constants/authConstants';

export const fetchData = (from, to, interval, unitId, keyId, blockId, blockType) => {
  return (dispatch) => {
    API.getDataFromKey({ from, to, interval, unitId, keyId }, (res) => {

      dispatch({ type: FETCH_DATA_SUCCESS, value: res.data.data[0].sum_val, id: blockId, blockType })
    });
  }
}