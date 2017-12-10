import API from '../API';
import * as blockConstants from '../constants/blockConstants';
import * as t from '../tools';

const c = {
  ...blockConstants
};

export const fetchData = ({ from, to, interval, unitId, keyId, blockId, blockType }) => {
  return (dispatch, getState) => {
    API.getDataFromKey({ from, to, interval, unitId, keyId }, (res) => {

      let label = getState().blocksReducer.blocks.find((block) => {
        return blockId === block.blockId;
      });

      label = label ? label.title : ''

      const values = res.data.data.map((elem) => {
        return elem.sum_val.toFixed();
      });

      const labels = res.data.data.map((elem) => {
        return elem.new_timestamp;
      });

      const data = [
        {
          data: values,
          label,
        },
        {
          data: values.map((elem) => { return parseInt(elem, 10) + Math.random() * 50 }),
          label: `Random ${label}`
        }
      ];
      const value = res.data.data[0].sum_val.toFixed(0);

      dispatch({ type: c.FETCH_DATA_SUCCESS, labels, data, value, blockId });
    });
  }
}

export const fetchSumValueData = ({ from, to, interval, unitId, keyId, blockId, blockType, rowId = null }) => {
  return (dispatch) => {
    API.getDataFromKey({ from, to, interval, unitId, keyId }, (res) => {
      dispatch({ type: c.FETCH_SUM_VALUE_DATA_SUCCESS, value: parseInt(res.data.data[0].sum_val, 10), blockId, blockType, rowId })
    });
  }
}

export const toggleAddBlock = () => {
  return (dispatch) => {
    dispatch({ type: c.TOGGLE_ADD_BLOCK })
  }
}

export const addTableBlockRow = (blockId) => {
  return (dispatch) => {
    dispatch({ type: c.ADD_TABLE_BLOCK_ROW, blockId })
  }
}

export const removeBlock = (blockId) => {
  return (dispatch) => {
    dispatch({ type: c.REMOVE_BLOCK, blockId })
  }
}

export const addBlock = ({ from = '', to = '', timeSpan, unitId = 4, keyId = 95, blockType }) => {

  const date = t.getDatesFromInterval(timeSpan.value);

  return (dispatch) => {
    dispatch({
      type: c.SAVE_NEW_BLOCK,
      from: date.from,
      to: date.to,
      timeSpan: timeSpan.label,
      unitId,
      keyId,
      blockType
    })
    dispatch(toggleAddBlock())
  }
}