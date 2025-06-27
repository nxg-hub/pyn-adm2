// suspendedUsersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

export const fetchVirtualCards = createAsyncThunk(
  'virtualCards/fetch',
  async (_, thunkAPI) => {
    try{
      const virtualCards = await apiService.fetchVirtualCards();
     
      return virtualCards;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "An unknown error occurred");
    }
  }
);

const virtualCardsSlice = createSlice({
  name: 'virtualCards',
  initialState: {
    all: [],
    selectedCard: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCard: (state, action) => {
      state.selectedCard= action.payload;
    },
    // clearSelectedWallet: (state) => {
    //   state.selectedWallet = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVirtualCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVirtualCards.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchVirtualCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCard } = virtualCardsSlice.actions;
export default virtualCardsSlice.reducer;
