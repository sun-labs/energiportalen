import API from '../API';
import axios from 'axios';
import * as APIRoutes from '../Splash/assets/APIRoutes';
import * as locationConstants from '../constants/locationConstants';
import * as blockConstants from '../constants/blockConstants';
import * as t from '../tools';

const c = {
  ...APIRoutes,
  ...locationConstants,
  ...blockConstants
};

export const getUnitsFromLocation = (location) => {

    return (dispatch) => {
       API.getUnitsFromLocation(location.id, (res) => {
        const units = res.data.map((unit) => ({ ...unit, location_id: location.id }))
        dispatch({
          type: c.GET_UNITS_FROM_LOCATION,
          units: res.data.map((unit) => ({ ...unit, location_id: location.id })),
          location
        })

        units.map((unit) => {

          API.getKeysFromUnit(unit.id, (res) => {

              dispatch({
                type: c.GET_KEYS_FROM_UNIT,
                keys: res.data.map((key) => ({ ...key, unitId: unit.id })),
                unit
              })
          });

          return null;

        })

      });
    }
  }

export const fetchLocationData = ({ timeSpan, interval, unitId, keyId, title, blockType, location_id }) => {

  const date = t.getDatesFromInterval(timeSpan.value);

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

  keyId = 126;
  let units;

  return (dispatch) => {

    API.getUnitsFromLocation(location_id, (res) => {
      units = res.data.map((unit) => ({ ...unit }))
      unitId = units[0].id

      API.getKeysFromUnit(unitId, (res) => {

        let keys = res.data.map((key) => ({ ...key, unitId }));
        keyId = keyId = keys.find(x => x.id === 6).keyId;

          API.getDataFromKey({ from: date.from, to: date.to, interval, unitId, keyId }, (res) => {

            const values = res.data.data.map((elem) => {
              return elem.avg_val.toFixed(3);
            });

            const labels = res.data.data.map((elem) => {
              return elem.new_timestamp;
            });

            const data = [
              {
                data: values,
                label: title,
              }
            ];
            const value = res.data.data[0].sum_val;

            dispatch({ type: c.FETCH_LOCATION_DATA_SUCCESS, labels, data, value, location_id });
          });
      });


      // }
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
          .map(x => ({ ...x, id: x.location_id }) )
          .filter(x => x.id !== 1 && x.id !== 2 && x.id !== 3 && x.id !== 4 && x.id !== 5 && x.id !== 6) // FUL FIX
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