
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instanceAction from "./instanceAction";
const initialState = {
  ObjectInstances:[],
  objectInstance:[],
  Instances:[],
  isInsSuccess:false,
  isInsError:false,
  isError: false,
  isSuccess: false,
  isLoadding: false,
  message: "",

};





export const getObjectInstance = createAsyncThunk(
    "objects/objectInstances",
    async (objectId,thunkAPI) => {
      try {
        return await instanceAction.getObjectInstances(objectId);
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );
  export const getInstance = createAsyncThunk(
    "objects/obInstances",
    async (data,thunkAPI) => {
      try {
        return await instanceAction.getObjInstances(data);
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );
  
  export const getInstanceByObjectName = createAsyncThunk(
    "objects/get-instance",
    async (objectName,thunkAPI) => {
      try {
        return await instanceAction.getInstanceByObjectName(objectName);
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

  
export const instanceSlice = createSlice({
    name: "instanceSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
          .addCase(getObjectInstance.pending, (state) => {
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
        }).addCase(getInstance.pending, (state) => {
          state.isLoadding = true;
        })
        .addCase(getInstance.fulfilled, (state, action) => {
          state.isLoadding = false;
          state.isInsSuccess = true;
          state.Instances = action.payload.result.requests;
          state.ObjectInstances=action.payload.result.requests?.productPerPage!==null && action.payload.result.requests?.productPerPage!==undefined  ? JSON.parse(action.payload.result.requests?.productPerPage): []
        })
        .addCase(getInstance.rejected, (state, action) => {
          state.isLoadding = false;
          state.isInsError = true;
          state.isInsSuccess = false;
          state.Instances = [];
          state.ObjectInstances=[];
          state.message = action.payload?.response?.data?.message;
        }).addCase(getInstanceByObjectName.pending, (state) => {
          state.isLoadding = true;
        })
        .addCase(getInstanceByObjectName.fulfilled, (state, action) => {
          state.isLoadding = false;
          state.isSuccess = true;
          state.objectInstance =JSON.parse(action.payload.result.requests);
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
  
  export default instanceSlice.reducer;