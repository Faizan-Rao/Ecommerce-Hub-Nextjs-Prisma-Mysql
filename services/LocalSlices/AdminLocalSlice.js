import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoggedIn: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    removeAdmin: (state) => {
      state.data = {};
      state.isLoggedIn = false;
     
    },
    setAdmin: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { setAdmin, removeAdmin} = adminSlice.actions;

export default adminSlice.reducer;
