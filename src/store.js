import { configureStore } from "@reduxjs/toolkit";
import objectsReducer from "./redux/objectSlice";
import typeReducer from "./redux/Type/typeSlice";
import instanceReducer from "./redux/Instance/instanceSlice";



export const store = configureStore({
  reducer: {
    objects: objectsReducer,
    types: typeReducer,
    instances: instanceReducer,

  },
});