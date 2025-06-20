import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

// Async thunk  fetch user data
export const fetchAdmins = createAsyncThunk('admin/fetchAdmins',   async (_, { rejectWithValue }) => {

  try {
    const response = await apiService.fetchAdmins()
     
    return response; 
  } catch (error) {
    return rejectWithValue(error?.message || "An unknown error occurred");
  }    
});


// Initial state
const initialState = {
  admins: [],
  selectedAdmin: null,
  success: false,
  loading: false,
  error: null,
};

const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    setSelectedAdmin: (state, action) => {
      state.selectedAdmin = action.payload;
    },
    logOut: (state) => {
      state.admins = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload.data.admins; 
        state.success = true;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedAdmin, logOut } = adminsSlice.actions;
export default adminsSlice.reducer;
