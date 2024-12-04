import { createSlice } from "@reduxjs/toolkit";
import { getSession, setSession } from "@/shared/lib/helpers";

const initialState = {
  token: null,
  isAuthenticated: getSession()?.isAuthenticated || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;

      setSession({ ...action.payload, isAuthenticated: true });
    },
    logout: state => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
