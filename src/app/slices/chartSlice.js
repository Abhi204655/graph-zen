import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Services from "../../services";

const initialState = {
  options: {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      title: {
        display: false,
        text: "",
        position: "top",
        align: "start",
        font: {
          weight: "bold",
          size: 20,
        },
      },
    },
  },
  data: { datasets: [] },
  init: false,
  canBeLayered: true,
  embedLoading: false,
  embedId: null,
  graphFetched: false,
};

export const createEmbedId = createAsyncThunk(
  "chart/createEmbedId",
  async (load) => {
    console.log(load);
    const id = await Services.storeData(load);
    return id;
  }
);

export const getDataFromEmbedId = createAsyncThunk(
  "chart/getDataFromEmbedId",
  async (id) => {
    const data = await Services.getData(id);
    return data;
  }
);

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
    addChartTitle: (state, action) => {
      if (action.payload.add) {
        state.options.plugins.title.display = true;
        state.options.plugins.title.text = action.payload.title;
        state.options.plugins.title.align = action.payload.align;
        state.options.plugins.title.font.size = action.payload.fontSize;
      } else {
        state.options.plugins.title.display = false;
        state.options.plugins.title.text = "";
        state.options.plugins.title.align = "start";
        state.options.plugins.title.font.size = 20;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmbedId.pending, (state, action) => {
        state.embedLoading = true;
      })
      .addCase(createEmbedId.fulfilled, (state, action) => {
        state.embedLoading = false;
        if (!action.payload.regenerate) {
          state.embedId = action.payload.id;
        }
      })
      .addCase(createEmbedId.rejected, (state, action) => {
        state.embedLoading = false;
      })
      .addCase(getDataFromEmbedId.pending, (state, action) => {
        state.embedLoading = true;
      })
      .addCase(getDataFromEmbedId.fulfilled, (state, action) => {
        state.embedLoading = false;
        if (action.payload.invalid) {
          state.graphFetched = false;
        } else {
          state.options = action.payload.options;
          state.data = action.payload.data;
          state.graphFetched = true;
        }
      })
      .addCase(getDataFromEmbedId.rejected, (state, action) => {
        state.embedLoading = false;
        state.graphFetched = false;
      });
  },
});

const { reducer: chartReducer } = chartSlice;
export const {
  addTitle,
  addSeries,
  removeSeries,
  changeChartColor,
  addChartTitle,
} = chartSlice.actions;
export default chartReducer;
