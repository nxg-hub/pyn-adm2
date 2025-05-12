import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUnsuspendedUsers = createAsyncThunk(
 'unsuspendedUsers/fetch',
  async () => {
    const res = await fetch(import.meta.env.VITE_GET_UNSUSPENDED_USERS)
    const data = await res.json();
    return data.data.content; 
  }
);

const unsuspendedUsersSlice = createSlice({
  name: "unsuspendedUsers",
  initialState: {
    all: [],
    loading: false,
    error: null,
    selectedDetails: null
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
