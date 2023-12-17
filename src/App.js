import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import toast, { Toaster } from 'react-hot-toast';
import Topbar from "./pages/global/Topbar.jsx";
import Dashboard from "./pages/dashboard/index.tsx";
import Invoices from "./pages/objects/index.jsx";
import Form from "./pages/form/index.jsx";
import AllObjects from "./pages/objects/index.jsx";
import AllObjectsTypes from "./pages/objectsTypes/index.js";
import ObjectInstance from "./pages/objectsInstances/index.js";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getObjects } from "./redux/objectSlice.js";
import {  getAllObjectTypes } from "./redux/Type/typeSlice.js";
import AllObjectsRecords from "./pages/records/index.js";



const App = () => {
  const [theme, colorMode] = useMode();
  const dispatch=useDispatch();
  const {objects} =useSelector((state)=>state.objects);
  const {objectTypes}=useSelector((state)=>state.types);
  useEffect(()=>{
    if(!localStorage.getItem("getObjectTypes")){
      dispatch(getAllObjectTypes());
    }else{
     localStorage.setItem("getObjectTypes",JSON.stringify(objectTypes));
    }
    if(!localStorage.getItem("getAllObjects")){
      dispatch(getObjects());
    }else{
      localStorage.setItem("getAllObjects",JSON.stringify(objects));
    }
  },[]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/objects" element={<AllObjects />} />
                <Route path="/objectsTypes" element={<AllObjectsTypes />} />
                <Route path="/records" element={<AllObjectsRecords />} />
                <Route path="/objectIntances" element={<ObjectInstance />} />
                <Route path="/form" element={<Form />} /> 
              </Routes>
              <Toaster/>
            </main>
          </div>
          </LocalizationProvider>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};




export default App;
