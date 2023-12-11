import React, { useEffect } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";

import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllObjectTypes } from "../../redux/Type/typeSlice";
import Loader from "../../components/Loader";

const AllObjectsTypes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch=useDispatch();
  const {isLoadding,objectTypes,isSuccess,isError}=useSelector((state)=>state.types);
  const customStyle = {
    width: '100px', // Adjust to your desired width
    height: '100px', // Adjust to your desired height
  };

  const columns = [
    { field: "objectTypeId", headerName: "Object Type Id" },
    {
      field: "objectTypeName", headerName: "Object Type Name",
      width: 200,
      cellClassName: "name-column--cell",
    },
    { field: "createdBy", headerName: "CreatedBy", width: 200 },
    { field: "objectTypeCategory", headerName: "Object Type Category", width: 200 },
    { field: "updatedBy", headerName: "Updated By", width: 100 },
  ];
  return (
    <>
    {
        isLoadding===true ?(
            <Loader/>
        ): (<Box  ml="20px"  mr="20px" mb="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Header title="All Objects Types" subtitle="Objects Schema" />
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
      
              <DataGrid getRowId={(row) => row.objectTypeId}  rows={objectTypes && objectTypes.filter && objectTypes.filter((a)=>(a.objectTypeName!=="Root" && a.objectTypeName!=="Field" && a.objectTypeName!=="User"))} columns={columns} />
            </Box>
          </Box>)
            
    }
    </>

  );
};

export default AllObjectsTypes;
