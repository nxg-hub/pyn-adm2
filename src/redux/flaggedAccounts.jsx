// flaggedUsersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

export const fetchFlaggedUsers = createAsyncThunk(
  'flaggedUsers/fetch',
  async (_, thunkAPI) => {
  try{
      const res = await apiService.fetchFlaggedUsers()
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "An unknown error occurred");
    }
  }
);

const flaggedUsersSlice = createSlice({
  name: 'flaggededUsers',
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
      .addCase(fetchFlaggedUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFlaggedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchFlaggedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedDetails, clearSelectedDetails } = flaggedUsersSlice.actions;
export default flaggedUsersSlice.reducer;
