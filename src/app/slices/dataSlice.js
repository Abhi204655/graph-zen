import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  uploaded: false,
  dataTypes: null,
  fileName:null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    upload: (state, action) => {
      state.fileName = action.payload.fileName;
      state.data = action.payload.data;
      state.uploaded = true;
      state.dataTypes = action.payload.dataTypes;
    },
  },
});

const { reducer: dataReducer } = dataSlice;
export const { upload } = dataSlice.actions;
export default dataReducer;
