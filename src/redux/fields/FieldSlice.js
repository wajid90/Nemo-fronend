import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fieldService from "./FieldAction";
const initialState = {
  fields: [],
  fieldData:null,
  isFieldError: false,
  isFieldSuccess: false,
  addfieldToObject:null,
  isLoadding: false,
  addFieldLoadding:false,
  fieldSuccessMessage: "",
  fieldErrorMessage: "",
  message: "",
};

export const addFieldObject = createAsyncThunk(
  "fields/add-fields",
  async (FieldData,thunkAPI) => {
    try {
      return await fieldService.createField(FieldData);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addFieldToObj = createAsyncThunk(
    "fields/add-field-to-object",
    async (FieldData,thunkAPI) => {
      try {
        return await fieldService.addFieldToObjectObj(FieldData);
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const getAllFields = createAsyncThunk(
    "fields/getAllfields",
    async (FieldData,thunkAPI) => {
      try {
        return await fieldService.getAllFields(FieldData);
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );
  



export const fieldSlice = createSlice({
  name: "fieldSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFields.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getAllFields.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.fields=action.payload.result;
      })
      .addCase(getAllFields.rejected, (state, action) => {
        state.isLoadding = false;
        state.isFieldError = true;
        state.isFieldSuccess = false;
        state.fields =[];
        state.fieldErrorMessage = action.payload?.message;
      }).addCase(addFieldObject.pending, (state) => {
        state.addFieldLoadding = true;
      })
      .addCase(addFieldObject.fulfilled, (state, action) => {
        state.addFieldLoadding = false;
        state.isFieldSuccess = true;
        state.fieldData=action.payload;
        state.fieldSuccessMessage = action.payload.message;
      })
      .addCase(addFieldObject.rejected, (state, action) => {
        state.addFieldLoadding = false;
        state.isFieldError = true;
        state.isFieldSuccess = false;
        state.fieldData =null;
        state.fieldErrorMessage = action.payload?.message;
      }).addCase(addFieldToObj.pending, (state) => {
        state.addFieldLoadding = true;
      })
      .addCase(addFieldToObj.fulfilled, (state, action) => {
        state.addFieldLoadding = false;
        state.isFieldSuccess = true;
        state.addfieldToObject=action.payload;
        state.fieldSuccessMessage = action.payload.message;
      })
      .addCase(addFieldToObj.rejected, (state, action) => {
        state.addFieldLoadding = false;
        state.isFieldError = true;
        state.isFieldSuccess = false;
        state.addfieldToObject =null;
        state.fieldErrorMessage = action.payload?.message;
      }).addCase("clearError",(state)=>{
        state.isFieldError=false;
        state.fieldErrorMessage = "";
      }).addCase("clearSuccess",(state)=>{
        state.fieldSuccessMessage="";
        state.isFieldSuccess=false;
        state.addfieldToObject=null;
        state.fieldData=null;
      })
  },
});



export default fieldSlice.reducer;

