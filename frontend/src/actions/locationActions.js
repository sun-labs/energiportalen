import API from '../API';
import axios from 'axios';
import { API_URL } from '../Splash/assets/APIRoutes';
import {
  GET_LOCATION,
  GET_LOCATIONS,
  GET_UNITS_FROM_LOCATION,
  GET_KEYS_FROM_UNIT,
} from '../constants/locationConstants';

export const getLocation = (id) => {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    axios.get(API_URL+'/locations/' + id, 
              { headers: {Authorization: token}})
    .then(res => {
      const location = {
        city: res.data.city,
        country: res.data.country,
        description: res.data.description,
        id: res.data.id,
        image: res.data.image,
        name: res.data.name
      };

      dispatch({
        type: GET_LOCATION,
        location
      })
  });
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