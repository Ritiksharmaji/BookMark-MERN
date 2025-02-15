import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch bookmarks from API
export const fetchBookmarks = createAsyncThunk("bookmarks/fetchBookmarks", async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get("http://localhost:5000/api/bookmarks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// ✅ Define addBookmark correctly
export const addBookmark = createAsyncThunk("bookmarks/addBookmark", async (bookmarkData, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await axios.post("http://localhost:5000/api/bookmarks", bookmarkData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: { bookmarks: [], status: "idle", error: null },
  reducers: {}, // No regular reducers, all are async thunks
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => { state.status = "loading"; })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
      });
  },
});

// ✅ Only export default once
export default bookmarkSlice.reducer;
