import API from '../API';
import axios from 'axios';
import * as APIRoutes from '../Splash/assets/APIRoutes';
import * as locationConstants from '../constants/locationConstants';

const c = {
  ...APIRoutes,
  ...locationConstants
};

export const fetchLocationData = ({ from, to, interval, unitId, keyId, title, blockType, locationId }) => {
  return (dispatch, getState) => {
    API.getDataFromKey({ from, to, interval, unitId, keyId }, (res) => {

      const values = res.data.data.map((elem) => {
        return elem.sum_val.toFixed();
      });

      const labels = res.data.data.map((elem) => {
        return elem.new_timestamp;
      });

      const data = [
        { 
          data: values, 
          label: title, 
        },
        { 
          data: values.map((elem) => { return parseInt(elem, 10) + Math.random() * 50 }),
          label: `Random ${title}`
        }
      ];
      const value = res.data.data[0].sum_val.toFixed(0);

      dispatch({ type: c.FETCH_LOCATION_DATA_SUCCESS, labels, data, value, locationId });
    });
  }
}

export const getLocation = (id) => {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    axios.get(c.API_URL+'/locations/' + id, 
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
        type: c.GET_LOCATION,
        location
      })
  });
  }
}

export const getLocations = () => {
  return (dispatch) => {
    API.getLocations({}, (res) => {

      dispatch({ 
        type: c.GET_LOCATIONS,
        locations: res.data
      })
    });
  }
}

export const getUnitsFromLocation = (location) => {
  return (dispatch) => {
     API.getUnitsFromLocation(location.id, (res) => {
      dispatch({
        type: c.GET_UNITS_FROM_LOCATION,
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
        type: c.GET_KEYS_FROM_UNIT,
        keys: res.data.map((key) => ({ ...key, unitId: unit.id })),
        unit
      })
    });
  }
}