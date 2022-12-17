import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  moviesReducer: [],
};

const moviesSlice = createSlice({
  name: "moviesSlice",
  initialState,
  reducers: {
    setMovieList: (state, action) => {
      state.moviesReducer = [...action.payload];
    },
  },
});

export const { setMovieList } = moviesSlice.actions;

export default moviesSlice.reducer;
