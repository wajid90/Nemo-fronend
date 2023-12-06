import React, { useEffect } from "react";
import { Alert, Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";

import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { objectInstance  } from "../../redux/objectSlice";
import { useParams } from "react-router-dom";

const ObjectInstance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  const dispatch=useDispatch();
  const {isLoadding,ObjectInstances}=useSelector((state)=>state.objects);
  const {id}=useParams();
  console.log(id);
  useEffect(()=>{
     dispatch(objectInstance(id));
   },[id]);



  const columns = [
    { field: "InstanceId", headerName: "Instance Id" },
    {
      field: "InstanceName",
      headerName: "Instance Name",
      width: 200,
      cellClassName: "name-column--cell",
    },
    { field: "Instance Label", headerName: "Instance Label", width: 200 },
    { field: "MappingId", headerName: "Mapping Id", width: 100 },
    { field: "ObjectId", headerName: "Object Id", width: 100 },
    { field: "ParentObjectInstance", headerName: "Parent Object Instance", width: 100 },
    { field: "IsDeleted", headerName: "Is Deleted", width: 100 },
    { field: "Latitude", headerName: "Latitude", width: 100 },
    { field: "Longitude", headerName: "Longitude", width: 100 },
    { field: "CreatedDate", headerName: "Created Date", width: 100 },
    { field: "CreatedBy", headerName: "Created By", width: 100 },
    { field: "EditedDate", headerName: "Edited Date", width: 100 },
    { field: "EditedBy", headerName: "Edited By", width: 100 },
    { field: "RelationType", headerName: "Relation Type", width: 100 },
    { field: "CreatedDate", headerName: "Created Date", width: 100 },
  
  ];
  return (
    <>
    {
        isLoadding===true ?(
            <CircularProgress />
        ):
    <Box  ml="20px"  mr="20px" mb="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Objects Instances" subtitle="Objects Instances" />
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
           ObjectInstances!=null && ObjectInstances.length>0 ? <DataGrid getRowId={(row) => row.InstanceId}  rows={ObjectInstances} columns={columns} />:<Alert severity="error">Intances Doesn't  Found ...</Alert>
        }
       
      </Box>
    </Box>
}
    </>
  );
};

export default ObjectInstance;
