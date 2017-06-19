const initialBlock = {
  title: '',
  from: '',
  to: '',
  interval: '',
  unitId: '',
  keyId: '',
  refresh: false
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
  blocks: [],
};

const illuBlockReducer = (state = initialIlluBlock, action = null) => {
  switch(action.type) {
    default: 
      return state;
  }
}

const blockReducer = (state = {}, action = null) => {
  switch(action.type) {
    default:
      return state;
  }
}

const blocksReducer = (state = initialState, action = null) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default blocksReducer;