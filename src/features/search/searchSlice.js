import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchUsersApi, searchEventApi, searchDatabaseApi, searchUserCreatedApi } from './searchAPI';

const initialState = {
  status: 'idle',
  searchUser: null,
  // searchTrack: null,
  searchEvent: null,
  searchDatabase: null,
  searchUserCreated: null
};


export const searchUserAsync = createAsyncThunk("searchUser", async (keyword) => {
  const response = await searchUsersApi(keyword);
  return response.data;
});

// export const searchTrackAsync = createAsyncThunk("searchTrack", async (keyword) => {
//   const response = await searchTrackApi(keyword);
//   return response.data;
// });

export const searchEventAsync = createAsyncThunk("searchEvent", async (keyword) => {
  const response = await searchEventApi(keyword);
  return response.data;
});

export const searchDatabaseAsync = createAsyncThunk("searchDatabase", async (data) => {
  const response = await searchDatabaseApi(data);
  return response.data;
});

export const searchUserCreatedAsync = createAsyncThunk("searchUserCreated", async (id) => {
  const response = await searchUserCreatedApi(id);
  return response.data;
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder

      .addCase(searchUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchUser = action.payload;
      })


      // .addCase(searchTrackAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(searchTrackAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.searchTrack = action.payload;
      // })


      .addCase(searchEventAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchEventAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchEvent = action.payload;
      })


      .addCase(searchDatabaseAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchDatabaseAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchDatabase = action.payload;
      })


      .addCase(searchUserCreatedAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchUserCreatedAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchUserCreated = action.payload;
      })

  }
})

export const selectSearchUser = (state) => state.search.searchUser;
// export const selectSearchTrack = (state) => state.search.searchTrack;
export const selectSearchEvent = (state) => state.search.searchEvent;
export const selectSearchDatabase = (state) => state.search.searchDatabase;
export const selectSearchUserCreated = (state) => state.search.searchUserCreated;

export default searchSlice.reducer;