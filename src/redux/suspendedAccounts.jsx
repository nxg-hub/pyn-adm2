// suspendedUsersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSuspendedUsers = createAsyncThunk(
  'suspendedUsers/fetch',
  async () => {
    const res = await fetch(import.meta.env.VITE_GET_SUSPENDED_USERS)
    const data = await res.json();
    return data.data.content; // array of objects with userDetails & suspensionDetails
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
