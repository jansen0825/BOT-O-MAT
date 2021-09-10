import { combineReducers } from '@reduxjs/toolkit';

import robotsReducer, { NAME as ROBOTS_NAME } from '../features/robots/robotsSlice';

const rootReducer = combineReducers({
  [ROBOTS_NAME]: robotsReducer,
});

export default rootReducer;
