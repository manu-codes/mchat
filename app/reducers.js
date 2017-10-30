import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import leftPaneReducer from './components/LeftPane/reducers.js';
import rightPaneReducer from './components/RightPane/reducers.js';
import chatReducer from './containers/Chat/reducers.js';
// IMPORT HERE //

const rootReducer = combineReducers({
  leftPaneReducer,
  rightPaneReducer,
  chatReducer,
  // ADD REDUCER HERE //
  routing: routerReducer,
});

export default rootReducer;
