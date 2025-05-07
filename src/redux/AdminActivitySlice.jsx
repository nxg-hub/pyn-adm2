import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector} from "react-redux";


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

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/admin/management/${adminId}/activity-logs?${queryParams}`, {
        method: "GET",
        headers: {
          'X-Admin-Id': superAdminId,
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
const AdminActivitiesSlice = createSlice({
  name: "AdminActivities",
  initialState: {
    adminId: null,
    AdminActivities: [],
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
        state.AdminActivities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedAdminId } = AdminActivitiesSlice.actions;

export default AdminActivitiesSlice.reducer;
