import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from '../services/apiService';

// Async thunk to fetch admin activities
export const fetchActivities = createAsyncThunk(
  "AdminActivities/fetchActivities",
  async ({ adminId, superAdminId }, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams({
        page: 0,
        size: 100,
        sortBy: "timestamp",
        sortDirection: "desc"
      }).toString();

      const response = await apiService.fetchActivities(adminId, superAdminId, queryParams);
      
      // Now we can properly access the nested data structure
      return {
        data: response?.data?.data?.content || [],
        total: response?.data?.data?.totalElements || 0
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch admin activity');
    }
  }
);

const AdminActivitiesSlice = createSlice({
  name: "AdminActivities",
  initialState: {
    adminId: null,
    AdminActivities: [],
    totalItems: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedAdminId: (state, action) => {
      state.adminId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.AdminActivities = action.payload.data;
        state.totalItems = action.payload.total;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedAdminId } = AdminActivitiesSlice.actions;

export default AdminActivitiesSlice.reducer;
