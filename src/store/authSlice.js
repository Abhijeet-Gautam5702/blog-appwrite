import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state, action) => {
      state.status = false;
      state.userData = null;
    },
  },
});

// export the individual authSlice reducer methods (called authSlice actions when extracted individually)
export const { login, logout } = authSlice.actions;

// export the reducer of authSlice and register it in store
export const authReducer = authSlice.reducer;
