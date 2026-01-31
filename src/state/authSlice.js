import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const register = createAsyncThunk("auth/register", async (payload, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed");
  }
});

export const login = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

export const fetchMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/auth/me");
    return data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(null);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
