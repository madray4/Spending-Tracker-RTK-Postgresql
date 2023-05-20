import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  loading: false,
  error: null
};

export const login = createAsyncThunk(
  'auth/login', 
  async ({ email, password }, { rejectWithValue }) => {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      return json
    }
    else {
      return rejectWithValue(json.error);
    } 
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
});

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }, { rejectWithValue }) => {
    const response  = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (response.ok){
      localStorage.setItem('user', JSON.stringify(json));
      return json
    }
    else {
      return rejectWithValue(json.error);
    }
  }
)

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // login cases
    builder.addCase(login.pending, (state) => {
      return { ...state, loading: true};
    });
    builder.addCase(login.fulfilled, (state, action) => {
      return { ...state, loading: false, user: action.payload, error: null };
    });
    builder.addCase(login.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload }
    });

    // logout cases
    builder.addCase(logout.fulfilled, (state) => {
      return { ...state, user: null };
    });

    // signup cases
    builder.addCase(signup.pending, (state) => {
      return { ...state, loading: true }
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      return { ...state, user: action.payload, loading: false, error: null }
    });
    builder.addCase(signup.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload }
    });
  }
});

// export const { loginRequested, loginSucceeded, loginFailed, loggedout } = authSlice.actions;

export default authSlice.reducer;