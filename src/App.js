import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import { Toaster } from 'react-hot-toast';
import Topbar from "./pages/global/Topbar.jsx";
import Dashboard from "./pages/dashboard/index.tsx";
import Form from "./pages/form/index.jsx";
import AllObjects from "./pages/objects/index.jsx";
import AllObjectsTypes from "./pages/objectsTypes/index.js";
import ObjectInstance from "./pages/objectsInstances/index.js";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AllObjectsRecords from "./pages/records/index.js";
import AddObjectsType from "./pages/objectsTypes/addObjectType.js";
import Instances from "./pages/instances/index.js";
import React, { useEffect } from "react";



const App = () => {
  const [theme, colorMode] = useMode();
  const [search,setSearch]=React.useState("");
  const [search1,setSearch1]=React.useState("");

  let location = useLocation();
  if(location.pathname==="/records") {
    location.search=search;
  }else if(location.pathname==="/objectsTypes") {
    location.search=search1;
  }
  
  
  console.log(location);
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ height: "100%", width:  "93%" }}>
            <main>
              <Topbar search={search} setSearch={setSearch} search1={search1} setSearch1={setSearch1} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/objects" element={<AllObjects />} />
                <Route path="/objectsTypes" element={<AllObjectsTypes />} search={search1} />
                <Route path={`/records`} element={<AllObjectsRecords/>} search={search} />
                <Route path="/objectIntances" element={<ObjectInstance  />} />
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
