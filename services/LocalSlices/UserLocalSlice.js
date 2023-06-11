import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoggedIn: false,
  store: {}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.data = {};
      state.isLoggedIn = false;
      state.store = {}
    },
    setUser: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      
    },
    removeStore: (state) => {
      state.store = {};
    },
    setStore: (state, action) => {
      state.store = action.payload;
      
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser, setStore, removeStore } = userSlice.actions;

export default userSlice.reducer;
