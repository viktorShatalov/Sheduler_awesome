import { combineReducers } from 'redux';

import ref from './ref.reducer';
import user from './user.reducer';
import lawyer from './lawyer';

const rootReducer = combineReducers({
  ref,
  user,
  lawyer,
});

export default rootReducer;