import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  count: 0,
};

const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      if (action.payload) {
        state.count++;
        state.isLoading = action.payload;
      } else {
        state.count--;
        if (state.count === 0) {
          state.isLoading = action.payload;
        }
      }
    },
  },
});

export const { setIsLoading } = spinnerSlice.actions;

export default spinnerSlice.reducer;
