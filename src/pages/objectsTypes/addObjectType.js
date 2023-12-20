import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Loader from "../../components/Loader";

const AddObjectsType = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
    <Box display="flex" justifyContent="space-between" alignItems="center" style={{
          marginLeft:"10px"
      }}>
      <Header title="Add Object Type" subtitle="" />
      
    </Box>


    </>

  );
};

export default AddObjectsType;
