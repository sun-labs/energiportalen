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
  SAVE_NEW_BLOCK
} from '../constants/blockConstants';

const tempRow = {
  unitId: 4,
  keyId: 95,
  value: '',
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
  refresh: true,
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
}

const initialIlluBlock = {
  ...initialBlock,
  value: -1,
  subtitle: 'Uppsala',
  timeSpan: '24h',
  interval: 'hour',
}

const initialState = {
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
      unitId: 4,
      keyId: 95,
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
          { ...tempRow, id: state.rows.length }
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
    case SAVE_NEW_BLOCK:

      let newBlock = {};

      switch(action.blockType) {
        case PHONE:
          newBlock = {
            ...initialIlluBlock,
            interval: action.interval,
          }
          break;
        case TABLE:
          newBlock = {
            ...initialBlock,
            subtitle: 'TEMP_SUBTITLE',
            rows: [],
          }
          break;
        case SCOOTER:
          newBlock = {
            ...initialIlluBlock,
          }
          break;
        case LINE:
          newBlock = {
            ...initialGraphBlock,
            data: [],
            dataKey: '',
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            interval: action.interval
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
            from: action.from,
            to: action.to,
            unitId: action.unitId,
            keyId: action.keyId
          },
          ...state.blocks,
        ]
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