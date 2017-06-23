import API from '../API';
import {
  FETCH_SUM_VALUE_DATA_SUCCESS,
  TOGGLE_ADD_BLOCK,
  ADD_TABLE_BLOCK_ROW,
  FETCH_DATA_SUCCESS,
  TOGGLE_EDIT_BLOCK,
  GET_LOCATIONS,
  GET_UNITS_FROM_LOCATION,
  GET_KEYS_FROM_UNIT,
  SAVE_NEW_BLOCK
} from '../constants/blockConstants';

export const fetchData = ({ from, to, interval, unitId, keyId, blockId, blockType }) => {
  return (dispatch, getState) => {
    API.getDataFromKey({ from, to, interval, unitId, keyId }, (res) => {

      const label = getState().blocksReducer.blocks.filter((block) => {
        return blockId === block.blockId;
      })[0].title;

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

      dispatch({ type: FETCH_DATA_SUCCESS, labels, data, value, blockId });
    });
  }
}

export const fetchSumValueData = ({ from, to, interval, unitId, keyId, blockId, blockType }) => {
  return (dispatch) => {
    API.getDataFromKey({ from, to, interval, unitId, keyId }, (res) => {
      dispatch({ type: FETCH_SUM_VALUE_DATA_SUCCESS, value: res.data.data[0].sum_val, blockId, blockType })
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

export const toggleEditBlock = (blockId) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_EDIT_BLOCK, blockId })
  }
}

export const addBlock = ({ from, to, interval, unitId, keyId, blockType }) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_NEW_BLOCK,
      from,
      to,
      interval,
      unitId,
      keyId,
      blockType
    })
    dispatch(toggleAddBlock())
  }
}

export const getLocations = () => {
  return (dispatch) => {
    API.getLocations({}, (res) => {

      dispatch({ 
        type: GET_LOCATIONS,
        locations: res.data
      })
    });
  }
}

export const getUnitsFromLocation = (location) => {
  return (dispatch) => {
     API.getUnitsFromLocation(location.id, (res) => {
      dispatch({
        type: GET_UNITS_FROM_LOCATION,
        units: res.data.map((unit) => ({ ...unit, locationId: location.id })),
        location
      })
    });
  }
}

export const getKeysFromUnit = (unit) => {
  return (dispatch, getState) => {
    API.getKeysFromUnit(unit.id, (res) => {

      dispatch({
        type: GET_KEYS_FROM_UNIT,
        keys: res.data.map((key) => ({ ...key, unitId: unit.id })),
        unit
      })
    });
  }
}