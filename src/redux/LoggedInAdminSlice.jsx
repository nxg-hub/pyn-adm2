import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

// Async thunk to fetch logged in admin data
export const fetchAdmin = createAsyncThunk(
  'admin/fetchAdmin', 
  async (email, { rejectWithValue }) => {
  try {
    const response = await apiService.fetchAdmin(email)
    return response; 
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  admin: null,
  success: false,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logOut: (state) => {
      state.admin = null;
      state.success = false;
      localStorage.removeItem('email');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.data.admin; 
        state.success = true;
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logOut } = adminSlice.actions;
export default adminSlice.reducer;
