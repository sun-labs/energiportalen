import API from '../API';
import {
  GET_LOCATIONS,
  GET_UNITS_FROM_LOCATION,
  GET_KEYS_FROM_UNIT,
} from '../constants/locationConstants';

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