import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = `https://vocab-builder-backend.p.goit.global/api`;

// Utility to add JWT to headers
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT from headers
const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/users/signup`, {
        name,
        email,
        password,
      });
      const { token, email: userEmail, name: userName } = res.data;
      setAuthHeader(token);

      console.log('Registration successful:', { userName, userEmail });
      toast.success('Registration successful');

      return { token, user: { email: userEmail, name: userName } };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      console.error('Registration error:', errorMessage);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/users/signin`, {
        email,
        password,
      });
      const { token, email: userEmail, name: userName } = res.data;
      setAuthHeader(token);

      console.log('Login successful:', { userName, userEmail });
      toast.success('Login successful');

      return { token, user: { email: userEmail, name: userName } };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      console.error('Login error:', errorMessage);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.post(`${apiUrl}/users/signout`);
    clearAuthHeader();

    console.log('Logout successful');
    toast.success('User logged out successfully.');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Logout failed';
    console.error('Logout error:', errorMessage);
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    console.error('No token available for refreshing user');
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }

  try {
    setAuthHeader(persistedToken);
    const res = await axios.get(`${apiUrl}/users/current`);

    console.log('User refreshed:', res.data);
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to refresh user';
    console.error('Failed to refresh user:', errorMessage);
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}/users/current`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
