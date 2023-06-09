import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.data = {};
      state.isLoggedIn = false;
      
    },
    setUser: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
