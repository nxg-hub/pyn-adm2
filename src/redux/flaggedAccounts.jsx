// flaggedUsersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFlaggedUsers = createAsyncThunk(
  'flaggedUsers/fetch',
  async () => {
    const res = await fetch(import.meta.env.VITE_GET_FLAGGED_USERS)
    const data = await res.json();
    return data.data.content; // array of objects with userDetails & suspensionDetails
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
