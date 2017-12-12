import * as blockConstants from '../constants/blockConstants';

const c = {
  ...blockConstants
};

export const tempRow = {
  unitId: 4,
  keyId: 95,
  value: -1,
  si: 'kWh',
  name: 'Energy Produced'
}

export const initialBlock = {
  unitId: '',
  keyId: '',
  refresh: true,
  blockId: '',
  blockType: '',
  editing: false,
  interval: 'hour',
}

export const initialGraphBlock = {
  ...initialBlock,
  data: [],
  dataKey: '',
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
}

export const initialIlluBlock = {
  ...initialBlock,
  value: -1,
  timeSpan: '24h',
}

const initialState = {
  addingBlock: false,
  blocks: [
    {
      // ...initialIlluBlock,
      blockId: 0,
      blockType: c.PHONE,
      editing: false,
      interval: c.HOUR,
      keyId: 134,
      locationId: 4516,
      refresh: true,
      timeSpan: '30d',
      unitId: 10,
    },
    {
      // ...initialBlock,
      blockId: 1,
      blockType: c.TABLE,
      city: 'CITY',
      editing: false,
      interval: c.HOUR,
      keyId: 130,
      locationId: 4514,
      refresh: true,
      timeSpan: '7d',
      unitId: 8,
      rows: [],
    },
    {
      // ...initialIlluBlock,
      blockId: 2,
      blockType: c.SCOOTER,
      editing: false,
      interval: c.HOUR,
      keyId: 133,
      timeSpan: '30d',
      unitId: 9,
    },
    {
      // ...initialGraphBlock,
      blockId: 3,
      blockType: c.LINE,
      editing: false,
      interval: c.DAY,
      keyId: 126,
      locationId: 4513,
      refresh: true,
      timeSpan: '365d',
      unitId: 7,
    },
    ],
};

const blockReducer = (state = {}, action = null) => {
  switch(action.type) {
    case c.ADD_TABLE_BLOCK_ROW:
      console.log('')
      console.log('')
      console.log('state', state)
      return {
        ...state,
        rows: [
          ...state.rows,
          { ...tempRow, id: state.rows.length, timeSpan: state.timeSpan }
        ]
      }
    case c.FETCH_DATA_SUCCESS:
      return {
        ...state,
        labels: action.labels,
        data: action.data,
        value: action.value
      }
    case c.FETCH_SUM_VALUE_DATA_SUCCESS:
      if (typeof action.rowId === 'number') {
        return {
          ...state,
          rows: state.rows.map((row) => {
            if (row.id === action.rowId) {
              return {
                ...row,
                value: parseInt(action.value, 0)
              }
            } else {
              return row;
            }
          })
        }
      } else {
        return {
          ...state,
          value: action.value
        }
      }
    default:
      return state;
  }
}

const blocksReducer = (state = initialState, action = null) => {
  switch(action.type) {
    case c.SAVE_NEW_BLOCK:

      let newBlock = {};

      switch(action.blockType) {
        case c.PHONE:
          newBlock = {
            ...initialIlluBlock,
            timeSpan: action.timeSpan,
          }
          break;
        case c.TABLE:
          newBlock = {
            ...initialBlock,
            city: 'CITY',
            rows: [],
          }
          break;
        case c.SCOOTER:
          newBlock = {
            ...initialIlluBlock,
          }
          break;
        case c.LINE:
          newBlock = {
            ...initialGraphBlock,
            interval: action.interval,
            data: [],
            dataKey: '',
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            timeSpan: action.timeSpan
          }
          break;
        default:
          break;
      }
      return {
        ...state,
        blocks: [
          {
            ...newBlock,
            blockId: state.blocks.length,
            blockType: action.blockType,
            timeSpan: action.timeSpan,
            unitId: action.unitId,
            keyId: action.keyId,
            locationId: action.locationId
          },
          ...state.blocks,
        ]
      }
    case c.TOGGLE_ADD_BLOCK:
      return {
        ...state,
        addingBlock: !state.addingBlock
      }
    case c.REMOVE_BLOCK:
      return {
        ...state,
        blocks: state.blocks.filter((block) => {
          return block.blockId !== action.blockId
        })
      }
    case c.ADD_TABLE_BLOCK_ROW:
    case c.FETCH_SUM_VALUE_DATA_SUCCESS:
    case c.FETCH_DATA_SUCCESS:
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