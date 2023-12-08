import React, { useEffect } from "react";
import { Alert, Box, Button, CircularProgress,Typography, useTheme} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";

import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getObjects } from "../../redux/objectSlice";
import { Link } from "react-router-dom";

const AllObjects = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch=useDispatch();
  const {isLoadding,objects}=useSelector((state)=>state.objects);

  useEffect(()=>{
      dispatch(getObjects());
  },[]);
  const columns = [
    { field: "objectId", headerName: "Object Id" },
    {
      field: "objectName",
      headerName: "Object Name",
      width: 200,
      cellClassName: "name-column--cell",
    },
    { field: "objectTitle", headerName: "Object Title", width: 200 },
    { field: "objectDescription", headerName: "Object Description", width: 200 },
    { field: "maxFieldsExpected", headerName: "Max Fields Expected", width: 200 },
    { field: "objectValueType", headerName: "ObjectValue Type", width: 200 },
    { field: "objectControlType", headerName: "ObjectControl Type", width: 200 },
    { field: "isDeleted", headerName: "isDeleted", width: 100 },

  ];
  return (
    <>
    {
        isLoadding===true ?(
            <CircularProgress />
        ):<Box ml="20px"  mr="20px" mb="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="All Objects" subtitle="All object Records " />
      </Box>
      <Box
        m="8px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiChackbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
      {
         objects && objects.length>0? <DataGrid getRowId={(row) => row.objectId}  rows={objects} columns={columns} />: <Alert severity="error">Objects Doesn't  Found ...</Alert>
      } 
      </Box>
    </Box>
}
  </>
  );
};

export default AllObjects;
