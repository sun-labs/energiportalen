import * as blockActions from './blockActions';
import * as locationActions from './locationActions';
import * as authActions from './authActions';

const actions = {
  ...blockActions,
  ...locationActions,
  ...authActions
};

export default actions;