import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, refreshUser, getCurrentUser } from './authOperations.js';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLogin: false,
    isRefreshing: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    clearUser: state => {
      state.user = null;
      state.token = null;
      state.isLogin = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogin = true;
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(login.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogin = true;
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isLogin = false;
        state.status = 'idle';
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
        state.isLogin = true;
        state.status = 'succeeded';
      })
      .addCase(getCurrentUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectIsLogin = state => state.auth.isLogin;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectAuthUser = state => state.auth.user;
export const selectAuthStatus = state => state.auth.status;

export default authSlice.reducer;
