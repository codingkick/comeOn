import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "chhote lal",
  email: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      state.name = action.payload.name;
      state.email = action.payload.email;
    },

    unsetUser: (state) => {
      state.name = null;
      state.email = null;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
