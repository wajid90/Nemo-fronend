import React, { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";

const AllObjectsRecords = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch=useDispatch();
  const {isLoadding,objects,isSuccess,isError}=useSelector((state)=>state.objects);

  const columns = [
    { field: "objectId", headerName: "Id" },
    {
      field: "objectName", headerName: "Name",
      width: 200,
      cellClassName: "name-column--cell",
    },
    { field: "objectTitle", headerName: "Title", width: 200 },
    { field: "objectDescription", headerName: "Description", width: 200 },
    { field: "createdBy", headerName: "CreatedBy", width: 200 },

  ];
  return (
    <>
    {
        isLoadding===true ?(
            <Loader/>
        ): (<Box  ml="20px"  mr="20px" mb="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Header title="All Objects" subtitle="Objects" />
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
      
              <DataGrid getRowId={(row) => row.objectId}  rows={objects && objects.filter && objects.filter((a)=>(a.objectName!=="Root" && a.objectName!=="Field" && a.objectName!=="User"))} columns={columns} />
            </Box>
          </Box>)
            
    }
    </>

  );
};

export default AllObjectsRecords;
