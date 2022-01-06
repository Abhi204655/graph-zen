import { combineReducers } from "redux";
import { chartReducer, dataReducer, layerReducer } from "../slices";


const appReducer = combineReducers({
  chart: chartReducer,
  data: dataReducer,
  layer: layerReducer,
});


export const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }

  return appReducer(state, action);
};


// export const rootReducer = combineReducers({
//   chart: chartReducer,
//   data: dataReducer,
//   layer: layerReducer,
// });
