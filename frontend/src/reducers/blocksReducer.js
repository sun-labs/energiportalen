// included:
// illuphoneblock
// illuscooterblock
// tableblock
// lineblock

import {
  FETCH_SUM_VALUE_DATA_SUCCESS,
  TOGGLE_ADD_BLOCK,
  ADD_TABLE_BLOCK_ROW,
  FETCH_DATA_SUCCESS,
  TOGGLE_EDIT_BLOCK,
  PHONE,
  TABLE,
  SCOOTER,
  LINE,
  GET_LOCATIONS,
  GET_UNITS_FROM_LOCATION,
  GET_KEYS_FROM_UNIT,
  SAVE_NEW_BLOCK
} from '../constants/blockConstants';

const tempRow = {
  unitId: 4,
  keyId: 95,
  value: 400,
  si: 'Wh',
  span: '1d',
  interval: 'day',
  from: '2017-02-10',
  to: '2017-02-10 23:23:59',
  title: 'Energy Produced'
}

const initialBlock = {
  title: 'Akademiska Sjukhuset',
  from: '2017-02-10',
  to: '2017-02-10 23:59:59',  
  unitId: '',
  keyId: '',
  refresh: false,
  blockId: '',
  blockType: '',
  editing: false
}

const initialGraphBlock = {
  ...initialBlock,
  data: [],
  dataKey: '',
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  interval: 'hour',
  refresh: true
}

const initialIlluBlock = {
  ...initialBlock,
  value: -1,
  subtitle: 'Uppsala',
  timeSpan: '24h',
  interval: 'hour',
  refresh: true
}

// const locations = [
//   location,
//   location,
//   location
// ]

// const location = {
//   id,
//   name,
//   units: [
//     unit,
//     unit,
//     unit
//   ]
// }

// const unit = {
//   locationId,
//   id,
//   name,
//   keys: [
//     key,
//     key,
//     key
//   ]
// }

// const key = {
//   unitId,
//   id,
//   name
// }

const initialState = {
  locations: [],
  addingBlock: false,
  blocks: [
    { 
      ...initialIlluBlock,
      blockType: PHONE, 
      id: 0,
      unitId: 4,
      keyId: 95,
      blockId: 0,
    },
    { 
      ...initialBlock, 
      blockType: TABLE, 
      blockId: 1,
      subtitle: 'Uppsala',
      rows: []
    },
    { 
      ...initialIlluBlock, 
      blockType: SCOOTER, 
      blockId: 2,
      unitId: 4,
      keyId: 95,
    },
    { 
      ...initialGraphBlock, 
      blockType: LINE,
      timeSpan: '24h',
      blockId: 3,
      unitId: 4,
      keyId: 95
    },
    ],
};

const blockReducer = (state = {}, action = null) => {
  switch(action.type) {
    case TOGGLE_EDIT_BLOCK:
      return {
        ...state,
        editing: !state.editing
      }
    case ADD_TABLE_BLOCK_ROW:
      return {
        ...state,
        rows: [
          ...state.rows,
          tempRow
        ]
      }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        labels: action.labels,
        data: action.data,
        value: action.value
      }
    case FETCH_SUM_VALUE_DATA_SUCCESS:
      return {
        ...state,
        value: action.value
      }
    default:
      return state;
  }
}

const blocksReducer = (state = initialState, action = null) => {
  switch(action.type) {
    case SAVE_NEW_BLOCK:

      let newBlock = {};

      switch(action.blockType) {
        case PHONE:
          newBlock = {
            ...initialIlluBlock,
            from: action.from,
            to: action.to,
            interval: action.interval,
            unitId: action.unitId,
            keyId: action.keyId,
            blockId: state.blocks.length,
            blockType: action.blockType
          }
        case TABLE:
          newBlock = {
            ...initialBlock,
            subtitle: 'TEMP_SUBTITLE',
            rows: [],
            from: action.from,
            to: action.to,
            unitId: action.unitId,
            keyId: action.keyId,
            blockId: state.blocks.length,
            blockType: action.blockType
          }
        case SCOOTER:
          newBlock = {
            ...initialIlluBlock,
            from: action.from,
            to: action.to,
            unitId: action.unitId,
            keyId: action.keyId,
            blockId: state.blocks.length,
            blockType: action.blockType
          }
        case LINE:
        default:
          break;
      }

      return {
        ...state,
        blocks: [
          ...state.blocks,
          {
            
          }
        ]
      }
    case GET_KEYS_FROM_UNIT:
      return {
        ...state,
        locations: state.locations.map((loc) => {
          if (loc.id === action.unit.locationId) {
            return {
              ...loc,
              units: loc.units.map((u) => {
                if (u.id === action.unit.id) {
                  return {
                    ...u,
                    keys: action.keys
                  }
                } else {
                  return u;
                }
              })
            }
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
            return {
              ...loc,
              units: action.units
            }
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
    case TOGGLE_ADD_BLOCK:
      return {
        ...state,
        addingBlock: !state.addingBlock
      }
    case TOGGLE_EDIT_BLOCK:
    case ADD_TABLE_BLOCK_ROW:
    case FETCH_SUM_VALUE_DATA_SUCCESS:
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        blocks: state.blocks.map((block) => {
          if (block.blockId === action.blockId) {
            return blockReducer(block, action)
          } else {
            return block;
          }
        })
      }
    default:
      return state;
  }
}

export default blocksReducer;