import API from '../API';
import {
  FETCH_DATA_SUCCESS,
  TOGGLE_ADD_BLOCK,
  ADD_TABLE_BLOCK_ROW
} from '../constants/blockConstants';

export const fetchData = ({ from, to, interval, unitId, keyId, blockId, blockType }) => {
  return (dispatch) => {
    API.getDataFromKey({ from, to, interval, unitId, keyId }, (res) => {

      dispatch({ type: FETCH_DATA_SUCCESS, value: res.data.data[0].sum_val, blockId, blockType })
    });
  }
}

export const toggleAddBlock = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_ADD_BLOCK })
  }
}

export const addTableBlockRow = (blockId) => {
  return (dispatch) => {
    dispatch({ type: ADD_TABLE_BLOCK_ROW, blockId })
  }
}