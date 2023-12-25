import React from "react";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme, Box, IconButton, InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import { useLocation } from "react-router-dom";
const Topbar = ({search,setSearch,search1,setSearch1}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl ,collapsed} = useProSidebar();
  const location=useLocation();

  const handleChange=(e)=>{
    if(location.pathname==="/records"){
      setSearch(e.target.value);
    }else if(location.pathname==="/objectsTypes"){
      setSearch1(e.target.value);
    }
   
    //console.log(e.target.value);
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2} style={{
      width:collapsed ? "102%" :"100%" 
    }}>
      <Box display="flex">
        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
        >
          {
            location.pathname==="/records" &&<> <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" name={"search"} value={search} onChange={(e)=>handleChange(e)}/> <IconButton type="button">
            <SearchIcon />
          </IconButton></>
          }
          {
            location.pathname==="/objectsTypes" && <><InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" name={"search1"} value={search1} onChange={(e)=>handleChange(e)}/> <IconButton type="button">
            <SearchIcon />
          </IconButton></>
          }
          {
             location.pathname==="/objectIntances" && <><InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search"/> <IconButton type="button">
             <SearchIcon />
           </IconButton></>
          }
          
        </Box>
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            
           <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        {broken && rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
