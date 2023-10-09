import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  users: [],
  error: "",
};

// Generated pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.data.map((user) => user));
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // FetchUser add cases STARTS
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      (state.users = []), (state.error = "");
    }),
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      }),
      builder.addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message;
      });
    // FetchUser add cases ENDS
  },
});

export default userSlice.reducer;
// export { fetchUsers } = userSlice.actions
