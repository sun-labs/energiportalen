import {
  GET_LOCATIONS,
  GET_UNITS_FROM_LOCATION,
  GET_KEYS_FROM_UNIT,
} from '../constants/locationConstants';

// const initialKey = {
//   unitId: null,
//   id: null,
//   name: ''
// };

// const initialKeys = [];

// const initialUnit = {
//   locationId: null,
//   id: null,
//   name: '',
//   keys: initialKeys
// };

const initialUnits = [];

const initialLocation = {
  id: null,
  name: '',
  units: initialUnits,
};

const initialState = {
  locations: [],
};

const unitsReducer = (state = initialUnits, action = null) => {
  switch(action.type) {
    case GET_KEYS_FROM_UNIT:
      return state.map((unit) => {
        if (unit.id === action.unit.id) {
          return {
            ...unit,
            keys: action.keys
          }
        } else {
          return unit;
        }
      })
    default:
      return state;
  }
}

const locationReducer = (state = initialLocation, action = null) => {
  switch(action.type) {
    case GET_KEYS_FROM_UNIT:
      return {
        ...state,
        units: unitsReducer(state.units, action)
      }
    case GET_UNITS_FROM_LOCATION:
      return {
        ...state,
        units: action.units
      }
    default:
      return state;
  }
}

const locationsReducer = (state = initialState, action = null) => {
  switch(action.type) {
    case GET_KEYS_FROM_UNIT:
      return {
        ...state,
        locations: state.locations.map((loc) => {
          if (loc.id === action.unit.locationId) {
            return locationReducer(loc, action)
          } else {
            return loc;
          }
        })
      }
    case GET_UNITS_FROM_LOCATION:
      return {
        ...state,
        locations: state.locations.map((loc) => {
          if (loc.id === action.location.id) {
            return locationReducer(loc, action)
          } else {
            return loc;
          }
        })
      }
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.locations
      }
    default:
      return state;
  }
}

export default locationsReducer;