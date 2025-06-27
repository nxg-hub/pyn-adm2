// suspendedUsersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

export const fetchWallets = createAsyncThunk(
  'wallets/fetch',
  async (_, thunkAPI) => {
    try{
      const wallets = await apiService.fetchWallets();
     
      return wallets;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "An unknown error occurred");
    }
  }
);

const walletsSlice = createSlice({
  name: 'wallets',
  initialState: {
    all: [],
    selectedWallet: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedWallet: (state, action) => {
      state.selectedWallet = action.payload;
    },
    clearSelectedWallet: (state) => {
      state.selectedWallet = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchWallets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedWallet, clearSelectedWallet } = walletsSlice.actions;
export default walletsSlice.reducer;
