import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch unsuspended users
export const fetchUnsuspendedUsers = createAsyncThunk(
  "unsuspendedAccounts/fetchUnsuspendedUsers",
  async () => {
    const response = await fetch(import.meta.env.VITE_GET_UNSUSPENDED_USERS);
    if (!response.ok) throw new Error("Failed to fetch unsuspended users");
    return await response.json();
  }
);

const unsuspendedUsersSlice = createSlice({
  name: "unsuspendedUsers",
  initialState: {
    all: [],
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
      .addCase(fetchUnsuspendedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnsuspendedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchUnsuspendedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedDetails, clearSelectedDetails } = unsuspendedUsersSlice.actions;
export default unsuspendedUsersSlice.reducer;
