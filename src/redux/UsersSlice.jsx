import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch user data
export const fetchUsers = createAsyncThunk('user/fetchUsers',   async (_, { rejectWithValue }) => {

  try {
    const response = await fetch(import.meta.env.VITE_GET_ALL_USERS, {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user');
    }

    return data; 
  } catch (error) {
    console.error("Error fetching users:", error);
    return rejectWithValue(error?.message || "An unknown error occurred");
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
    // setSelectedUser: (state, action) => {
    //   const { userId, data } = action.payload;
    //   state.selectedUser =
    //     state.users.find((u) => u.id === userId) ||
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
        // data || null; // Use 'data' if not found in lists
    
    logOut: (state) => {
      state.users = null;
      state.success = false;
    },
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
