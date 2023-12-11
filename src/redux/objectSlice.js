import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import objectService from "./objectAction";
const initialState = {
  object: JSON.parse(localStorage.getItem('getAllObjects')) || [],
  objectStruture:{},
  getObjectByType:[],
  isError: false,
  isSuccess: false,
  isLoadding: false,
  message: "",

};

export const getObjects = createAsyncThunk(
  "objects/all-objects",
  async (thunkAPI) => {
    try {
      return await objectService.getAllObjects();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getObjectByType = createAsyncThunk(
  "objects/objectByType",
  async (objectType,thunkAPI) => {
    try {
      return await objectService.getObjectofType(objectType);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);


export const getObjectStrutureByObjectId = createAsyncThunk(
  "objects/get-objectStructure",
  async (objectId,thunkAPI) => {
    try {
      return await objectService.getObjectStruture(objectId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);


export const objectSlice = createSlice({
  name: "objectSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getObjects.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getObjects.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.objects = action.payload;
      })
      .addCase(getObjects.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.objectTypes = [];
        state.message = action.payload?.response?.data?.message;
      }).addCase(getObjectByType.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getObjectByType.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.objectByType =action.payload.result;
      })
      .addCase(getObjectByType.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.objectByType = [];
        state.message = action.payload?.response?.data?.message;
      }).addCase(getObjectStrutureByObjectId.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getObjectStrutureByObjectId.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.objectStruture = action.payload.result;
      })
      .addCase(getObjectStrutureByObjectId.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.objectStruture = [];
        state.message = action.payload?.response?.data?.message;
      })
  },
});

export default objectSlice.reducer;