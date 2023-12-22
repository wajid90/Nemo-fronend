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
import AddObjectsType from "./pages/objectsTypes/addObjectType.js";
import Instances from "./pages/instances/index.js";



const App = () => {
  const [theme, colorMode] = useMode();
  const dispatch=useDispatch();
  useEffect(()=>{
      dispatch(getAllObjectTypes());
      dispatch(getObjects());
  },[]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ height: "100%", width:  "93%" }}>
            <main>
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/objects" element={<AllObjects />} />
                <Route path="/objectsTypes" element={<AllObjectsTypes />} />
                <Route path="/records" element={<AllObjectsRecords />} />
                <Route path="/objectIntances" element={<ObjectInstance />} />
                <Route path="/add-object-type" element={<AddObjectsType />} />
                <Route path="/instance/:id" element={<Instances />} />
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
