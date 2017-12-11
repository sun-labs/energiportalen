import * as blockConstants from '../constants/blockConstants';

const c = {
  ...blockConstants
};

export const tempRow = {
  unitId: 4,
  keyId: 95,
  value: -1,
  si: 'kWh',
  span: '1d',
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
  blocks: [],
  // blocks: [
  //   {
  //     ...initialIlluBlock,
  //     blockType: c.PHONE,
  //     id: 0,
  //     unitId: 4,
  //     keyId: 95,
  //     blockId: 0,
  //   },
  //   {
  //     ...initialBlock,
  //     blockType: c.TABLE,
  //     blockId: 1,
  //     unitId: 4,
  //     keyId: 95,
  //     rows: [],
  //     interval: 'day'
  //   },
  //   {
  //     ...initialIlluBlock,
  //     blockType: c.SCOOTER,
  //     blockId: 2,
  //     unitId: 4,
  //     keyId: 95,
  //   },
  //   {
  //     ...initialGraphBlock,
  //     blockType: c.LINE,
  //     timeSpan: '24h',
  //     blockId: 3,
  //     unitId: 4,
  //     keyId: 95
  //   },
  //   ],
};

const blockReducer = (state = {}, action = null) => {
  switch(action.type) {
    case c.ADD_TABLE_BLOCK_ROW:
      return {
        ...state,
        rows: [
          ...state.rows,
          { ...tempRow, id: state.rows.length }
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