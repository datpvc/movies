import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  selectedSeats: [],
};

const seatSlice = createSlice({
  name: "seatSlice",
  initialState,
  reducers: {
    setSelectedSeat: (state, action) => {
      let cloneSelectedSeats = [...state.selectedSeats];

      // Tìm kiếm ghế đang chọn
      let index = cloneSelectedSeats.findIndex((seat) => {
        return seat.maGhe === action.payload.maGhe;
      });

      // Nếu đã có trong danh sách thì xóa, nếu chưa có thì add vào
      if (index !== -1) {
        cloneSelectedSeats.splice(index, 1);
      } else {
        cloneSelectedSeats.push(action.payload);
      }

      return { ...state, selectedSeats: cloneSelectedSeats };
    },
  },
});

export const { setSelectedSeat } = seatSlice.actions;

export default seatSlice.reducer;
