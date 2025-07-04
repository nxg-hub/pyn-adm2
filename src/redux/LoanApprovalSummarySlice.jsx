import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../services/apiService";

export const fetchLoanApprovalSummary = createAsyncThunk(
  "loanSummary/fetchLoanApprovalSummary",
  async (id, thunkAPI) => {
    try {
      const res = await apiService.fetchLoanApprovalSummarys(id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "An unknown error occurred"
      );
    }
  }
);

export const approveLoan = createAsyncThunk(
  "approveLoan/postapproveLoan",
  async ({ id, requestBody }, thunkAPI) => {
    try {
      const res = await apiService.approveLoan(id, requestBody);
      console.log(res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "An unknown error occurred"
      );
    }
  }
);

export const approveLowerAmount = createAsyncThunk(
  "approveLowerAmount/approveLowerAmount",
  async ({ id, amount }, thunkAPI) => {
    try {
      const res = await apiService.approveLowerAmount(id, amount);
      console.log(res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "An unknown error occurred"
      );
    }
  }
);

export const rejectLoan = createAsyncThunk(
  "rejectLoan/postRejectLoan",
  async ({ id, reason }, thunkAPI) => {
    try {
      const res = await apiService.rejectLoan(id, reason);
      console.log(res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "An unknown error occurred"
      );
    }
  }
);
const LoanApprovalSummarySlice = createSlice({
  name: "loanSummary",
  initialState: {
    allLoanSummary: [],
    loading: false,
    error: null,
    success: false,
    approveRes: [],
    approveSuccess: false,
    approveLoading: false,
    approveError: false,
    rejectRes: [],
    rejectLoading: false,
    rejectError: false,
  },
  reducers: {
    setRejectState: (state) => {
      state.rejectError = null;
      state.approveError = null;
      state.approveRes = null;
      state.rejectRes = null;
      state.approveSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanApprovalSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanApprovalSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.allLoanSummary = action.payload;
        state.success = true;
      })
      .addCase(fetchLoanApprovalSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
        // state.allLoanSummary = [];
      })
      .addCase(approveLoan.pending, (state) => {
        state.approveLoading = true;
        state.approveError = null;
      })
      .addCase(approveLoan.fulfilled, (state, action) => {
        state.approveLoading = false;
        state.approveRes = action.payload;
        state.approveSuccess = true;
      })
      .addCase(approveLoan.rejected, (state) => {
        state.approveLoading = false;
        state.approveError = true;
      })
      .addCase(approveLowerAmount.pending, (state) => {
        state.approveLoading = true;
        state.approveError = null;
      })
      .addCase(approveLowerAmount.fulfilled, (state, action) => {
        state.approveLoading = false;
        state.approveRes = action.payload;
        state.approveSuccess = true;
      })
      .addCase(approveLowerAmount.rejected, (state) => {
        state.approveLoading = false;
        state.approveError = true;
        state.approveSuccess = false;
      })
      .addCase(rejectLoan.pending, (state) => {
        state.rejectLoading = true;
        state.rejectError = null;
        state.rejectRes = [];
      })
      .addCase(rejectLoan.fulfilled, (state, action) => {
        state.rejectLoading = false;
        state.rejectRes = action.payload;
        state.success = true;
      })
      .addCase(rejectLoan.rejected, (state) => {
        state.rejectLoading = false;
        state.rejectError = true;
        state.success = false;
      });
  },
});

export const { setRejectState } = LoanApprovalSummarySlice.actions;
export default LoanApprovalSummarySlice.reducer;
