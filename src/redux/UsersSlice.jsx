import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

// Async thunk to fetch user data
export const fetchUsers = createAsyncThunk('user/fetchUsers',  
  async (_, { rejectWithValue }) => {

  try {
    const res = await apiService.fetchUsers()
    // console.log("API response", res);
    return res;
  } catch (error) {
    console.error("Error fetching users:", error);
    return rejectWithValue({
        message: error?.message || 'Failed to fetch users',
        code: error?.code || 'FETCH_USERS_ERROR'
      });
  }
});

// Initial state
const initialState = {
  users: [],
  selectedUser: null, 
  success: false,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    
   logOut: () => initialState,

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; 
        state.success = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setSelectedUser, logOut } = usersSlice.actions;
export default usersSlice.reducer;
