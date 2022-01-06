import { createSlice, nanoid } from "@reduxjs/toolkit";

const createLayer = (layerType) => {
  const uniqueId = nanoid();
  return {
    id: uniqueId,
    title: "new layer",
    type: null,
    xAxis: null,
    yAxis: null,
    saved:false,
    multiLayer: layerType,
  };
};

const initialState = {
  layers: [],
};

const layerSlice = createSlice({
  name: "layer",
  initialState,
  reducers: {
    add: (state, action) => {
      const newLayer = createLayer(action.payload);
      state.layers.push(newLayer);
    },
    remove: (state, action) => {
      state.layers = state.layers.filter((item) => item.id !== action.payload);
    },
    changeTitle: (state, action) => {
      let currentLayer = state.layers.find(
        (item) => item.id === action.payload.id
      );
      currentLayer.title = action.payload.title;
    },
    saveLayer: (state, action) => {
      let currentLayer = state.layers.find(
        (item) => item.id === action.payload.id
      );
      currentLayer.xAxis = action.payload.xAxis;
      currentLayer.yAxis = action.payload.yAxis;
      currentLayer.type = action.payload.type;
      currentLayer.saved = true;
      currentLayer.title = `new layer - ${action.payload.type.toUpperCase()}`;
    },
  },
});

const { reducer: layerReducer } = layerSlice;
export const { add, remove, saveLayer, changeTitle } = layerSlice.actions;
export default layerReducer;
