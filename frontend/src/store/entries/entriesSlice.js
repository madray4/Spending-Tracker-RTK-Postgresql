import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  entries: [],
  loading: false,
  error: "",
  emptyFields: []
};

export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async({ token }, { rejectWithValue }) => {
    const response = await fetch('/api/entries', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await response.json();
    if(response.ok){
      return json;
    }
    else{
      return rejectWithValue(json.error);
    }
  }
);

// create entries
export const createEntry = createAsyncThunk(
  'entries/createEntry',
  async ({ token, entry }, { rejectWithValue }) => {
    const response = await fetch('/api/entries', {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await response.json();
    if(response.ok){
      return json;
    }
    else{
      // console.log(json);
      return rejectWithValue(json);
    }
  }
);

// delete entries
export const deleteEntry = createAsyncThunk(
  'entries/deleteEntry',
  async ({ token, entry }, { rejectWithValue }) => {
    const response = await fetch(`/api/entries/${entry.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await response.json();
    
    if (response.ok){
      console.log(json);
      return json;
    }
    return rejectWithValue(json.error);
  }
);

// TODO: update entries
export const updateEntry = createAsyncThunk(
  'entries/updateEntry',
  async ({ token, entry }, { rejectWithValue }) => {
    const response = await fetch(`/api/entries/${entry._id}`, {
      method: 'PATCH',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await response.json();
    // response handling
    if (response.ok){
      return json;
    }

    // rejected updated 
    return rejectWithValue(json);
  }
);


export const entriesSlice = createSlice({
  name: "Entries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all entries cases  
    builder.addCase(fetchEntries.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null, entries: action.payload };
    });
    builder.addCase(fetchEntries.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    });
    // create entry cases
    builder.addCase(createEntry.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(createEntry.fulfilled, (state, action) => {
      return { ...state, 
          loading: false, 
          error: null, 
          entries: [ ...state.entries, action.payload ],
          emptyFields: []};
    });
    builder.addCase(createEntry.rejected, (state, action) => {
      return { ...state,
            loading: false, 
            error: action.payload.error,
            emptyFields: action.payload.emptyFields};
    });
    // delete entry
    builder.addCase(deleteEntry.fulfilled, (state, action) => {
      return {...state,
        error: null,
        entries: state.entries.filter((entry) => {
          return entry.id !== action.payload;
        })
      }
    });
    builder.addCase(deleteEntry.rejected, (state, action) => {
      return { ...state,
        error: action.payload
      }
    });
    // update entry case
    builder.addCase(updateEntry.pending, (state) => {
      return {
        ...state,
        loading: true
      }
    });
    builder.addCase(updateEntry.fulfilled, (state, action) => {
      let newEntries = [...state.entries];
      newEntries = newEntries.filter((entry) => {
        return entry._id !== action.payload._id;
      });
      newEntries = [...state.entries, action.payload];
      return{
        ...state,
        loading: false,
        error: null,
        entries: newEntries
      }
    });
    builder.addCase(updateEntry.rejected, (state, action) => {
      return{
        ...state,
        loading: false,
        error: action.payload.error,
        emptyFields: action.payload.emptyFields
      }
    });
  }
});

// export const {  } = entriesSlice.actions;

export default entriesSlice.reducer;

// const createSlice = require("@reduxjs/toolkit").createSlice;

// const initialState = {
//   entries: [],
//   loading: false,
//   error: ""
// }

// const entriesSlice = createSlice({
//   name: "Entries",
//   initialState,
//   reducers: {

//   }
// });

// module.exports = entriesSlice.reducer
// module.exports.entriesActions = entriesSlice.actions