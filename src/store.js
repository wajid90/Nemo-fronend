import { configureStore } from "@reduxjs/toolkit";
import objectsReducer from "./redux/objectSlice";


export const store = configureStore({
  reducer: {
    objects: objectsReducer,
  },
});