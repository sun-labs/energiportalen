import * as locationConstants from '../constants/locationConstants';
import * as blockConstants from '../constants/blockConstants';
import { initialGraphBlock } from './blocksReducer';

const c = {
  ...locationConstants,
  ...blockConstants
};

const initialUnits = [];

const initialBlock = {
  ...initialGraphBlock,
  blockType: c.LINE,
  timeSpan: '7d',
  unitId: 4,
  keyId: 95,
  locationId: null,
  blockId: -1,
  interval: c.DAY,
  detailedView: true
}

const initialLocation = {
  id: null,
  name: '',
  units: initialUnits,
  solarPlants: 158,
  totEffect: 340,
  block: initialBlock
};

const initialState = {
  locations: [],
};

const tempCleanLocationName = (location = '') => {
  switch (Number(location.id)) {
    case 4513:
      return 'KVV';
    case 4514:
      return 'Västerlövsta Prästgård';
    case 4515:
      return 'Ösby Lantbruksskola';
    case 4516:
      return 'Arnebo';
    case 4517:
      return 'Tjusarvägen';
    default:
      return 'NAME';
  }
}

const unitsReducer = (state = initialUnits, action = null) => {
  switch(action.type) {
    case c.GET_KEYS_FROM_UNIT:
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
    case c.FETCH_LOCATION_DATA_SUCCESS:
      return {
        ...state,
        block: {
          ...state.block,
          data: action.data,
          labels: action.labels,
          value: action.value,
          interval: action.interval
        }
      }
    case c.GET_KEYS_FROM_UNIT:
      return {
        ...state,
        units: unitsReducer(state.units, action)
      }
    case c.GET_UNITS_FROM_LOCATION:
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
    case c.FETCH_LOCATION_DATA_SUCCESS:
      return {
        ...state,
        locations: state.locations.map((loc) => {
          if (loc.id === action.id) {
            return locationReducer(loc, action)
          } else {
            return loc;
          }
        })
      }
    case c.GET_KEYS_FROM_UNIT:
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
    case c.GET_UNITS_FROM_LOCATION:
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
    case c.GET_LOCATION:
      let added = false;
      const location = {
        ...initialLocation,
        ...action.location,
        name: tempCleanLocationName(action.location),
        block: {
          ...initialBlock,
          locationId: action.location.id
        }
      }
      const locations = state.locations.map((loc) => {
        if (loc.id === action.location.id) {
          added = true;
          return {
            ...location
          }
        } else {
          return loc;
        }
      })

      return {
        ...state,
        locations: added ?
          locations :
          [
            ...state.locations,
            { ...location }
          ]
      }
    case c.GET_LOCATIONS:
      return {
        ...state,
        locations: action.locations.map((loc) => {
          return {
            ...initialLocation,
            ...loc,
            name: tempCleanLocationName(loc),
            block: {
              ...initialBlock,
              locationId: loc.id
            }
          }
        })
      }
    default:
      return state;
  }
}

export default locationsReducer;