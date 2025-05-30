import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch logged in admin data
export const fetchAdmin = createAsyncThunk('admin/fetchAdmin', async (email, { rejectWithValue }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_ADMIN_DETAILS}?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch admin');
    }

    return data; 
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Initial state
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
