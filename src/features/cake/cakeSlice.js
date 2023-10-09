import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numOfCake: 10,
};

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    cakeOrdered: (state, action) => {
      if (action.payload) {
        state.numOfCake -= action.payload;
      } else {
        state.numOfCake--;
      }
    },
    cakeRestocked: (state, action) => {
      // state.numOfCake += action.payload
      if (action.payload) {
        state.numOfCake += action.payload;
      } else {
        state.numOfCake++;
      }
    },
  },
});

export default cakeSlice.reducer;
export const { cakeOrdered, cakeRestocked } = cakeSlice.actions;
