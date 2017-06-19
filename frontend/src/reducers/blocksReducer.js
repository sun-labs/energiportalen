// included:
// illuphoneblock
// illuscooterblock
// tableblock
// lineblock

import {
  FETCH_DATA_SUCCESS
} from '../constants/blockConstants';


{/*<IlluPhoneBlock />
<TableBlock />
<IlluScooterBlock />
<LineBlock />*/}

const initialBlock = {
  title: '',
  from: '',
  to: '',
  interval: '',
  unitId: '',
  keyId: '',
  refresh: false,
  id: '',
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
  blocks: [
    { ...initialIlluBlock, blockType: 'PHONE', id: 0 },
    { ...initialBlock, blockType: 'TABLE', id: 1},
    { ...initialIlluBlock, blockType: 'SCOOTER', id: 2},
    { ...initialGraphBlock, blockType: 'LINE', id: 3},
    ],
};

const illuBlockReducer = (state = initialIlluBlock, action = null) => {
  switch(action.type) {
    default: 
      return state;
  }
}

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
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        blocks: state.blocks.map((block) => {
          if (block.id === action.id) {
            return blockReducer(block, action.id)
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