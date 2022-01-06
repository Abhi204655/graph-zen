import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    dragData: true,
  },
  data: { datasets: [] },
  init: false,
  canBeLayered: true,
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    addTitle: (state, action) => {
      state.options.title.text = action.payload;
    },
    addSeries: (state, action) => {
      state.init = true;
      // state.canBeLayered = false;

      let isPresent = state.data.datasets.findIndex(
        (el) => el.id === action.payload.id
      );
      if (isPresent !== -1) {
        const { borderColor, backgroundColor } = Object.assign(
          {},
          state.data.datasets[isPresent]
        );
        state.data.datasets[isPresent] = action.payload;
        state.data.datasets[isPresent].borderColor = borderColor;
        state.data.datasets[isPresent].backgroundColor = backgroundColor;
      } else {
        state.data.datasets.push(action.payload);
      }
    },
    removeSeries: (state, action) => {
      if (state.data.datasets.length > 0) {
        state.data.datasets = state.data.datasets.filter(
          (item) => item.id !== action.payload
        );
      }
      if (state.data.datasets.length === 0) {
        state.init = false;
      }
    },
    changeChartColor: (state, action) => {
      if (state.data.datasets.length > 0) {
        let isPresent = state.data.datasets.findIndex(
          (el) => el.id === action.payload.id
        );
        if (isPresent !== -1) {
          state.data.datasets[isPresent].borderColor =
            action.payload.borderColor;
          state.data.datasets[isPresent].backgroundColor =
            action.payload.backgroundColor;
        }
      }
    },
  },
});

const { reducer: chartReducer } = chartSlice;
export const { addTitle, addSeries, removeSeries, changeChartColor } =
  chartSlice.actions;
export default chartReducer;
