import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import objectService from "./objectAction";
const initialState = {
  object: JSON.parse(localStorage.getItem('getAllObjects')) || [],
  objectTypes:JSON.parse(localStorage.getItem('getObjectTypes')) || [],
  objectByType:[],
  ObjectInstances:[],
  objectInstance:[],
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
export const getObjectInstance = createAsyncThunk(
  "objects/objectInstances",
  async (objectId,thunkAPI) => {
    try {
      return await objectService.getObjectInstances(objectId);
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
export const getInstanceByObjectName = createAsyncThunk(
  "objects/get-instance",
  async (objectName,thunkAPI) => {
    try {
      return await objectService.getInstanceByObjectName(objectName);
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
      }).addCase(getObjectInstance.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getObjectInstance.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.ObjectInstances = JSON.parse(action.payload.result.requests);
      })
      .addCase(getObjectInstance.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.ObjectInstances = [];
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
      }).addCase(getInstanceByObjectName.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getInstanceByObjectName.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.objectInstance = action.payload.result;
      })
      .addCase(getInstanceByObjectName.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.objectInstance = [];
        state.message = action.payload?.response?.data?.message;
      })
     
  },
});

export default getAllProductsSlice.reducer;