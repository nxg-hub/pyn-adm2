// src/redux/slices/supportTicketsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';


export const fetchSupportTickets = createAsyncThunk(
  'supportTickets/fetchSupportTickets',
  async (_, thunkAPI) => {
    try {
      const tickets = await apiService.FetchSupportTickets();
      return tickets;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch support tickets');
    }
  }
);

const supportTicketsSlice = createSlice({
  name: 'supportTickets',
  initialState: {
    tickets: [],
    loading: false,
    error: null,
    activeTicket: null, 

  },
  reducers: {
    setActiveTicket: (state, action) => {
    state.activeTicket = action.payload; // full ticket object
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupportTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
        state.loading = false;
      })
      .addCase(fetchSupportTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveTicket } = supportTicketsSlice.actions;
export default supportTicketsSlice.reducer;
