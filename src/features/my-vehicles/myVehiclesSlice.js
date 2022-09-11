import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchVehicleApi, fetchCarMakeModel, fetchTyreMakeModel, addVehicleDetailApi } from './myVehiclesAPI';

const initialState = {
  status: 'idle',
  searchVehicle: null,
  vehicleDetails: null,
  vehicleMakeModel: null,
  carMakeModel: null,
  addVehicleDetail: null
};

export const searchVehicleAsync = createAsyncThunk("searchVehicle", async (keyword) => {
  const response = await searchVehicleApi(keyword);
  return response.data;
});

export const getVehcileMakeModelAsync = createAsyncThunk("vehiclemakemodel", async () => {
  const response = await fetchCarMakeModel();
  return response.data;
});

export const getCarMakeModelAsync = createAsyncThunk("carmakemodel", async () => {
  const response = await fetchTyreMakeModel();
  return response.data;
});

export const vehicleDetailAddAsync = createAsyncThunk("addvehicledetail", async (data) => {
  const response = await addVehicleDetailApi(data);
  return response.data;
});

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder

      .addCase(searchVehicleAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchVehicleAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchVehicle = action.payload;
      })

      .addCase(vehicleDetailAddAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(vehicleDetailAddAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.addVehicleDetail = action.payload;
      })

      .addCase(getVehcileMakeModelAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getVehcileMakeModelAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.vehicleMakeModel = action.payload;
      })

      .addCase(getCarMakeModelAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCarMakeModelAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.carMakeModel = action.payload;
      })

  }
})

export const selectSearchVehicle = (state) => state.vehicle.searchVehicle;

export const selectedVehicleMakeModelDetails = (state) => state.vehicle.vehicleMakeModel;

export const selectedCarMakeModelDetails = (state) => state.vehicle.carMakeModel;

export const selectedAddedVehicle = (state) => state.vehicle.addVehicleDetail;

export default vehicleSlice.reducer;