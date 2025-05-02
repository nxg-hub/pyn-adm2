import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch transactions
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (walletId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const queryParams = new URLSearchParams({
        page: 0,
        size: 100,
        start: 0,
        walletId: walletId,
      }).toString();

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/transactions/customer-history?${queryParams}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data.data.content)

      return data.data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// console.log(data.data.content)
const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    walletId: null,
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedWalletId: (state, action) => {
      state.walletId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedWalletId } = transactionsSlice.actions;

export default transactionsSlice.reducer;
