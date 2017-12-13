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

  location.locationId = location.locationId ? location.locationId : location.id;

  return (dispatch) => {
      API.getUnitsFromLocation(location.locationId, (res) => {
      const units = res.data.map((unit) => ({ ...unit, locationId: location.locationId }))
      dispatch({
        type: c.GET_UNITS_FROM_LOCATION,
        units: res.data.map((unit) => ({ ...unit, locationId: location.locationId })),
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

export const fetchLocationData = ({ timeSpan, interval, keyId, name, blockType, locationId }) => {

  timeSpan = c.intervalOptions.find(el => el.label === timeSpan).value

  const {
    from, to
  } = t.getDatesFromTimeSpan(timeSpan);

  return (dispatch, getState) => {
    const unitId = getState().locationsReducer.locations.find(loc => loc.id === locationId).unitId;

      API.getKeysFromUnit(unitId, (res) => {

        let keys = res.data.map((key) => ({ ...key, unitId }));
        keyId = keyId = keys.find(x => x.id === 6).keyId;

          API.getDataFromKey({ from, to, interval, unitId, keyId }, (res) => {
            const values = res.data.data.map((elem) => {
              return parseFloat(elem.sum_val, 3);
            });
      
            const labels = res.data.data.map((elem) => {
              return elem.new_timestamp;
            });
      
            let data;
      
            switch (timeSpan) {
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

            dispatch({ type: c.FETCH_LOCATION_DATA_SUCCESS, labels, data, value, id: locationId, interval });
          });
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
        name: res.data.name,
        unitId: res.data.unit_id
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
          .map(loc => ({
            city: loc.city,
            country: loc.country,
            description: loc.description,
            id: loc.id,
            image: loc.image,
            name: loc.name,
            unitId: loc.unit_id
          }))
          .filter(loc => Number(loc.id) > 100) // FUL FIX
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