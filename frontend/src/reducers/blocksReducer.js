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
  GET_UNITS_FROM_LOCATION
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

const initialState = {
  locationOptions: [],
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

// const illuBlockReducer = (state = initialIlluBlock, action = null) => {
//   switch(action.type) {
//     default: 
//       return state;
//   }
// }

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
    case GET_UNITS_FROM_LOCATION:
      return {
        ...state,
        locationOptions: state.locationOptions.map((loc) => {
          if (loc.value === action.location.value) {
            return {
              ...loc,
              unitOptions: action.units
            }
          } else {
            return loc;
          }
        })
      }
    case GET_LOCATIONS:
      return {
        ...state,
        locationOptions: action.locations
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