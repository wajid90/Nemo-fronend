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

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/objects" element={<AllObjects />} />
                <Route path="/objectsTypes" element={<AllObjectsTypes />} />
                <Route path="/objectIntances/:id" element={<ObjectInstance />} />
                <Route path="/form" element={<Form />} /> 
              </Routes>
              <Toaster/>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};




export default App;
