import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import objectService from "./objectAction";
const initialState = {
  object: [],
  objectTypes:[],
  ObjectInstances:[],
  isError: false,
  isSuccess: false,
  isLoadding: false,
  message: "",

};

export const getAllObjectTypes = createAsyncThunk(
  "objects/all-objectsType",
  async (thunkAPI) => {
    try {
      return await objectService.getAllObjectsType();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

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
export const objectInstance = createAsyncThunk(
  "objects/objectInstances",
  async (objectId,thunkAPI) => {
    try {
      return await objectService.getObjectInstances(objectId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);


export const getAllProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllObjectTypes.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getAllObjectTypes.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.objectTypes = action.payload;
      })
      .addCase(getAllObjectTypes.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.objectTypes = [];
        state.message = action.payload?.response?.data?.message;
      })
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
      }).addCase(objectInstance.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(objectInstance.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.ObjectInstances = JSON.parse(action.payload.result.requests);
      })
      .addCase(objectInstance.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.ObjectInstances = [];
        state.message = action.payload?.response?.data?.message;
      })
     
  },
});

export default getAllProductsSlice.reducer;