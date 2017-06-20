// included:
// illuphoneblock
// illuscooterblock
// tableblock
// lineblock

import {
  FETCH_DATA_SUCCESS,
  TOGGLE_ADD_BLOCK
} from '../constants/blockConstants';

const initialBlock = {
  title: '',
  from: '',
  to: '',
  interval: '',
  unitId: '',
  keyId: '',
  refresh: false,
  blockId: '',
  blockType: ''
}

const initialGraphBlock = {
  ...initialBlock,
  data: [],
  dataKey: '',
  labels: [],
}

const initialIlluBlock = {
  ...initialGraphBlock,
  value: -1,
  subtitle: '',
  timeSpan: '',
}

const initialState = {
  addingBlock: false,
  blocks: [
    { 
      ...initialIlluBlock,
      title: 'Akademiska Sjukhuset',
      subtitle: 'Uppsala',
      timeSpan: '24h',
      blockType: 'PHONE', 
      id: 0,
      from: '2017-02-10',
      to: '2017-02-10 23:59:59',
      interval: 'hour',
      unitId: 4,
      keyId: 95,
      blockId: 1,
      refresh: true
    },
    // { ...initialBlock, blockType: 'TABLE', id: 1},
    // { ...initialIlluBlock, blockType: 'SCOOTER', id: 2},
    // { ...initialGraphBlock, blockType: 'LINE', id: 3},
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
    case FETCH_DATA_SUCCESS:
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
    case TOGGLE_ADD_BLOCK:
      return {
        ...state,
        addingBlock: !state.addingBlock
      }
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