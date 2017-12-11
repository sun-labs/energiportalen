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
      ];
      const value = res.data.data[0].sum_val.toFixed(0);

      dispatch({ type: c.FETCH_DATA_SUCCESS, labels, data, value, blockId });
    });
  }
}

export const fetchSumValueData = ({ from, to, interval, unitId, keyId, blockId, blockType, rowId = null }) => {
  return (dispatch) => {

    API.getDataFromKey({ from, to, interval, unitId, keyId }, (res) => {

      const sum_val = res.data.data.reduce((tot, data) => {
        return tot + data.sum_val;
      }, 0)

      dispatch({
        type: c.FETCH_SUM_VALUE_DATA_SUCCESS,
        value: sum_val, //parseInt(res.data.data[0].sum_val, 10),
        blockId,
        blockType,
        rowId
      })
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

export const addBlock = ({ timeSpan, blockType, location }) => {

  const date = t.getDatesFromInterval(timeSpan.value);

  let interval;

  switch (timeSpan.value) {
    default:
    case c.DAY:
    interval = c.HOUR
    break;
    case c.WEEK:
    interval = c.HOUR
    break;
    case c.MONTH:
    interval = c.DAY
    break;
    case c.YEAR:
    interval = c.DAY
    break;
  }
  return (dispatch, getState) => {

    let locations = getState().locationsReducer.locations;

    const unit = locations.find(loc => {
      return loc.id === location.id;
    }).units[0];


    const keyId = unit.keys.find(key => {
      return key.id === 6;
    }).keyId;


    dispatch({
      type: c.SAVE_NEW_BLOCK,
      from: date.from,
      to: date.to,
      timeSpan: timeSpan.label,
      interval,
      unitId: unit.id,
      keyId,
      blockType
    })
    dispatch(toggleAddBlock())
  }
}