import API from '../API';
import * as blockConstants from '../constants/blockConstants';
import * as t from '../tools';

const c = {
  ...blockConstants
};

export const fetchData = ({ timeSpan, interval, unitId, keyId, blockId, blockType }) => {

  const {
    from, to
  } = t.getDatesFromTimeSpan(c.intervalOptions.find(el => el.label === timeSpan).value);

  return (dispatch, getState) => {
    API.getDataFromKey({ from, to, interval, unitId, keyId }, (res) => {

      const values = res.data.data.map((elem) => {
        return elem.avg_val.toFixed(3);
      });

      const labels = res.data.data.map((elem) => {
        return elem.new_timestamp;
      });

      let data;

      switch (c.intervalOptions.find(el => el.label === timeSpan).value) {
        case c.YEAR:
          data = [
            {
              data: t.reduceData(values.slice(0, -1), 52),
              label: name,
            }
          ];
          break;
        default:
          data = [
            {
              data: values.slice(0, -1),
              label: name,
            }
          ];
          break;
      }
      const value = res.data.data[0].sum_val.toFixed(0);

      dispatch({ type: c.FETCH_DATA_SUCCESS, labels, data, value, blockId });
    });
  }
}

export const fetchSumValueData = ({ timeSpan, interval, unitId, keyId, blockId, blockType, rowId = null }) => {
  return (dispatch) => {

    const {
      from, to
    } = t.getDatesFromTimeSpan(c.intervalOptions.find(el => el.label === timeSpan).value);

    API.getDataFromKey({ from, to, interval, unitId, keyId }, (res) => {

      const sum_val = res.data.data.reduce((tot, data) => {
        return tot + data.sum_val;
      }, 0);

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

export const addTableBlockRow = (blockId, timeSpan) => {
  return (dispatch) => {
    dispatch({ type: c.ADD_TABLE_BLOCK_ROW, blockId, timeSpan })
  }
}

export const removeBlock = (blockId) => {
  return (dispatch) => {
    dispatch({ type: c.REMOVE_BLOCK, blockId })
  }
}

export const addBlock = ({ timeSpan, blockType, location }) => {

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
      timeSpan: timeSpan.label,
      interval,
      unitId: unit.id,
      keyId,
      blockType,
      locationId: location.id
    })
    dispatch(toggleAddBlock())
  }
}