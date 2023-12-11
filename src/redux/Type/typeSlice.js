import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import typeAction from "./typeAction";
const initialState = {
  objectTypes:JSON.parse(localStorage.getItem('getObjectTypes')) || [],
  objectByType:[],
  isError: false,
  isSuccess: false,
  isLoadding: false,
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
        })
    },
  });
  
  export default typeSlice.reducer;