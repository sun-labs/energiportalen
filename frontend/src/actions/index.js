import * as blockActions from './blockActions';
import * as locationActions from './locationActions';

const actions = {
  ...blockActions,
  ...locationActions
};

export default actions;