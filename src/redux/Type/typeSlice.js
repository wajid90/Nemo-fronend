import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import typeAction from "./typeAction";
const initialState = {
  objectTypes: [],
  objectByType:[],
  objectType:null,
  isError: false,
  isSuccess: false,
  isLoadding: false,
  addLoadding:false,
  successMessage: "",
  errorMessage: "",
  message: "",

};



export const getAllObjectTypes = createAsyncThunk(
    "objects/all-objectsType",
    async (thunkAPI) => {
      try {
        return await typeAction.getAllObjectsType();
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );
  
  export const addObjectOfObjectType = createAsyncThunk(
    "objects/add-ObjectType",
    async (objectType,thunkAPI) => {
      try {
        return await typeAction.addObjectType(objectType);
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );
  

export const typeSlice = createSlice({
    name: "typeSlice",
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
        }).addCase(addObjectOfObjectType.pending, (state) => {
          state.addLoadding = true;
        })
        .addCase(addObjectOfObjectType.fulfilled, (state, action) => {
          state.addLoadding = false;
          state.isSuccess = true;
          state.objectType=action.payload;
          state.successMessage = action.payload.message;
        })
        .addCase(addObjectOfObjectType.rejected, (state, action) => {
          state.addLoadding = false;
          state.isError = true;
          state.isSuccess = false;
          state.objectType =null;
          state.errorMessage = action.payload?.message;
        }).addCase("clearError",(state)=>{
          state.isError=false;
          state.errorMessage = "";
          state.isError=false;
        }).addCase("clearSuccess",(state)=>{
          state.successMessage="";
          state.isSuccess=false;
          state.objectType=null;
        })
        
      }

  });
  
  export default typeSlice.reducer;