// suspendedUsersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

export const fetchSuspendedUsers = createAsyncThunk(
  'suspendedUsers/fetch',
  async (_, thunkAPI) => {
    try{
      const res = await apiService.fetchSuspendedUsers()
      console.log("Fetched suspended users:", res);
      if (!Array.isArray(res)) {
      throw new Error("Invalid data format: expected an array");
    }
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "An unknown error occurred");
    }
  }
);

const suspendedUsersSlice = createSlice({
  name: 'suspendedUsers',
  initialState: {
    all: [],
    selectedDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedDetails: (state, action) => {
      state.selectedDetails = action.payload;
    },
    clearSelectedDetails: (state) => {
      state.selectedDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuspendedUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuspendedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchSuspendedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedDetails, clearSelectedDetails } = suspendedUsersSlice.actions;
export default suspendedUsersSlice.reducer;
