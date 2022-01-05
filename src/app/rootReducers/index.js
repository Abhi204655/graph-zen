import { combineReducers } from "redux";
import { chartReducer, dataReducer, layerReducer } from "../slices";

export const rootReducer = combineReducers({
  chart: chartReducer,
  data: dataReducer,
  layer: layerReducer,
});
