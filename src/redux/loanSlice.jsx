import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../services/apiService";

export const fetchLoan = createAsyncThunk(
  "loan/fetchLoan",
  async (_, thunkAPI) => {
    try {
      const res = await apiService.fetchLoans();

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "An unknown error occurred"
      );
    }
  }
);

export const fetchLoanSchedule = createAsyncThunk(
  "loanSchedule/fetchLoanSchedule",

  async (id, thunkAPI) => {
    try {
      const res = await apiService.fetchLoanSchedule(id);
      // console.log(res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "An unknown error occurred"
      );
    }
  }
);

const loanSlice = createSlice({
  name: "loan",
  initialState: {
    allLoan: [],
    loading: false,
    error: null,
    selectedDetails: null,
    success: false,
    loanSchedule: [],
    scheduleLoading: false,
    scheduleError: false,
  },
  reducers: {
    setSelectedLoan: (state, action) => {
      state.selectedDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.allLoan = action.payload;
        state.success = true;
      })
      .addCase(fetchLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })
      .addCase(fetchLoanSchedule.pending, (state) => {
        state.scheduleLoading = true;
        state.scheduleError = null;
      })
      .addCase(fetchLoanSchedule.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.loanSchedule = action.payload;
      })
      .addCase(fetchLoanSchedule.rejected, (state, action) => {
        state.scheduleLoading = false;
        state.scheduleError = true;
      });
  },
});

export const { setSelectedLoan } = loanSlice.actions;
export default loanSlice.reducer;
