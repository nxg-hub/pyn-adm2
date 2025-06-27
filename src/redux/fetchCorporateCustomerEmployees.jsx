import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (customerId, thunkAPI) => {
    try {

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/corporate-customers/${customerId}/employees/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data)

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// console.log(data.data.content)
const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    customerId: null,
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
     
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCustomerId } = employeesSlice.actions;

export default employeesSlice.reducer;
