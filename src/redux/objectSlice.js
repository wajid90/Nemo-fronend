import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import objectService from "./objectAction";
const initialState = {
  object: [],
  objectStruture:[],
  getObjectByType:[],
  searchObjects:[],
  objectsWithPagination:[],
  objData:null,
  isError: false,
  isSuccess: false,
  isLoadding: false,
  addLoadding:false,
  successMessage: "",
  errorMessage: "",
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
export const searchObjectByFieldValue = createAsyncThunk(
  "objects/get-searchObject",
  async (data,thunkAPI) => {
    try {
      return await objectService.searchObject(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addObjectOfObject = createAsyncThunk(
  "objects/add-Object",
  async (objectData,thunkAPI) => {
    try {
      return await objectService.addObject(objectData);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const getObjectWithPaginations = createAsyncThunk(
  "objects/get-ObjectWithPagination",
  async (data,thunkAPI) => {
    try {
      return await objectService.getObjects(data);
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
        state.objects = [];
        state.message = action.payload?.response?.data?.message;
      }).addCase(getObjectWithPaginations.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getObjectWithPaginations.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.objectsWithPagination = action.payload;
      })
      .addCase(getObjectWithPaginations.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.objectsWithPagination = [];
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
      }).addCase(searchObjectByFieldValue.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(searchObjectByFieldValue.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.searchObjects = action.payload;
      })
      .addCase(searchObjectByFieldValue.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.searchObjects = [];
        state.message = action.payload?.response?.data?.message;
      }).addCase(addObjectOfObject.pending, (state) => {
        state.addLoadding = true;
      })
      .addCase(addObjectOfObject.fulfilled, (state, action) => {
        state.addLoadding = false;
        state.isSuccess = true;
        state.objData=action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(addObjectOfObject.rejected, (state, action) => {
        state.addLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.objData =null;
        state.errorMessage = action.payload?.message;
      }).addCase("clearError",(state)=>{
        state.isError=false;
        state.errorMessage = "";
      }).addCase("clearSuccess",(state)=>{
        state.successMessage="";
        state.isSuccess=false;
        state.objData=null;
      })
  },
});

export default objectSlice.reducer;

