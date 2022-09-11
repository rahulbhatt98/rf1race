import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchEventApi, fetchVehicleApi, fetchEventSessionApi, fetchEventSessionLapApi } from './myEventsAPI';

const initialState = {
  status: 'idle',
  eventData: null,
  vehicleData: null,
  eventSessionData: null,
  evevtSessionLapData: null
};

export const eventAsync = createAsyncThunk("event", async (eventId) => {
  const response = await fetchEventApi(eventId);
  return response.data;
});

export const vehicleAsync = createAsyncThunk("vehicle", async( vehicleId) => {
  const response = await fetchVehicleApi(vehicleId);
  return response.data;
})

export const eventSessionAsync = createAsyncThunk("eventSession", async (eventId) => {
  const response = await fetchEventSessionApi(eventId);
  return response.data;
});

export const eventSessionLapAsync = createAsyncThunk("eventLapSession", async (userId) => {
  const response = await fetchEventSessionLapApi(userId);
  return response.data;
});

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder

      .addCase(eventAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(eventAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.eventData = action.payload;
      })

      .addCase(vehicleAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(vehicleAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.vehicleData = action.payload;
      })

      .addCase(eventSessionAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(eventSessionAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.eventSessionData = action.payload;
      })

      .addCase(eventSessionLapAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(eventSessionLapAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.evevtSessionLapData = action.payload;
      })

  }
})

export const fetchVehicleList = (state) => state.event.vehicleData;
export const fetchEventList = (state) => state.event.eventData;
export const fetchEventSessionList = (state) => state.event.eventSessionData;
export const fetchEventSessionLap = (state) => state.event.evevtSessionLapData;

export default eventSlice.reducer;