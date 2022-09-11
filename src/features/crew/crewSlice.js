import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCrewApi, fetchCrewApi, crewSearchApi, userSearchApi, fetchCrewSelectedApi, fetchCrewById } from './crewApi';

const initialState = {
  status: 'idle',
  crewUser: null,
  createCrew: null,
  searchCrew: null,
  searchUser: null,
  crewSelected: null,
  crewById: null
};

export const crewAsync1 = createAsyncThunk("crew", async (data) => {
  const response = await createCrewApi(data);
  return response.data;
});

export const crewByIdAsync = createAsyncThunk("crewbyid", async (data) => {
  const response = await fetchCrewById(data);
  return response.data;
});

export const crewAsync = createAsyncThunk("crewfetch", async (id) => {
  const response = await fetchCrewApi(id);
  return response.data;
});

export const searchCrewAsync = createAsyncThunk("crewsearch", async (data) => {
  const response = await crewSearchApi(data);
  return response.data;
});

export const selectedCrewAsync = createAsyncThunk("crewselected", async (id) => {
  const response = await fetchCrewSelectedApi(id);
  return response.data;
});

export const searchUserAsync = createAsyncThunk("usersearch", async (data) => {
  const response = await userSearchApi(data);
  return response.data;
});


export const crewSlice = createSlice({
  name: 'crew',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
    
      .addCase(crewAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(crewAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.crewUser = action.payload;
      })
      
      .addCase(crewByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(crewByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.crewById = action.payload;
      })

      .addCase(selectedCrewAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(selectedCrewAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.crewSelected = action.payload;
      })

      .addCase(searchUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchUser = action.payload;
      })

      .addCase(searchCrewAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchCrewAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchCrew = action.payload;
      })

      .addCase(crewAsync1.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(crewAsync1.fulfilled, (state, action) => {
        state.status = 'idle';
        state.createCrew = action.payload;
      })

  }
})

export const fetchCrewList = (state) => state.crew.crewUser;
export const fetchSearchCrewList = (state) => state.crew.searchCrew;
export const fetchSearchUserList = (state) => state.crew.searchUser;
export const fetchSelectedCrewList = (state) => state.crew.crewSelected;
export const fetchCrewListById = (state) => state.crew.crewById;

export default crewSlice.reducer;