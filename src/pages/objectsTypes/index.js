import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from "@emotion/styled";
import toast from "react-hot-toast";
import { addObjectOfObjectType, getAllObjectTypes } from "../../redux/Type/typeSlice";

const AllObjectsTypes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {isLoadding,addLoadding,objectTypes,isError,isSuccess,message,objectType:objType,successMessage,errorMessage}=useSelector((state)=>state.types);
  const [open, setOpen] = React.useState(false);
  const [createdBy,setCreatedBy]=useState("");
  const [objectType,setObjectType]=useState("");

  const dispatch=useDispatch();

  console.log(createdBy + "  "+ objectType);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
     setObjectType("");
    setCreatedBy("");
    setOpen(false);
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
  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  });

  useEffect(()=>{
     if(isError===true){
         toast.error(errorMessage)
         dispatch({
          type:"clearError"
         })
     }
     if(isSuccess===true && objType!==null){
      console.log("this is hit now ...");
      toast.success(successMessage);
      dispatch(getAllObjectTypes());
      dispatch({
        type:"clearSuccess"
      })
      
     }
  },[isError,isSuccess,objType])
  const addObjectType=async ()=>{
      console.log("hitt ...");

    if(objectType===""){
      return toast.error("Object Type Field is Required ....");
    }
    if( createdBy===""){
      return toast.error("Created By Field  is Required ....");
    }

     await dispatch(addObjectOfObjectType({
        objectType: objectType,
        createdBy: createdBy
      }))
     
     await handleClose();
    
  }
  return (
    <>
    {
        isLoadding===true ?(
            <Loader/>
        ): (<Box  ml="20px"  mr="20px" mb="20px" style={{
          
        }}>
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
           <Dialog open={open} onClose={handleClose} PaperProps={{
          style: {
            backgroundColor:colors.blueAccent[900],
            boxShadow: "none",
            color:"black"
          },
        }}>
        <DialogTitle  sx={{
          color:"white"
        }}>Add Object Type </DialogTitle>
        <DialogContent  >
          <DialogContentText  sx={{
          color:"white"
        }}>
            
          </DialogContentText>
        <Box sx={{
          display:"flex",
        }}>
        <TextField
           
            margin="dense"
            id="objectType"
            label="Object Type"
            type="text"
            fullWidth
            variant="outlined"
            name="objectType"
            value={objectType}
            onChange={(e)=>setObjectType(e.target.value)}
            
            sx={{ width: 250,color: colors.blueAccent[800],"marginRight":"20px"}}
          />
            <TextField
               sx={{ width: 250,color: colors.blueAccent[800]}}
            margin="dense"
            id="createdBy"
            label="Created By"
            type="text"
            fullWidth
            variant="outlined"
            name="createdBy"
            value={createdBy}
            onChange={(e)=>setCreatedBy(e.target.value)}
          />
        </Box>
        </DialogContent>
        <DialogActions>
          
        <Button onClick={addObjectType} sx={{
             cursor:"pointer",
             color:"white",
             backgroundColor:colors.greenAccent[500],
             padding:"10px",
             ":hover":{
              color:"white",
              backgroundColor:colors.greenAccent[500],
             }
          }}> {addLoadding ===true ? "Loading ...":"Add"}</Button>
          <Button  onClick={handleClose}  sx={{
             cursor:"pointer",
             color:"white",
             backgroundColor:colors.redAccent[500],
             padding:"10px",
             ":hover":{
              color:"white",
              backgroundColor:colors.redAccent[500],
             }
          }}>Close</Button>
        
        </DialogActions>
      </Dialog>
        <Box  style={{
          width:"100%",
          position:"relative"
        }}>
        <Button  onClick={handleClickOpen} style={{
          textDecoration:"none",
          cursor:"pointer",
          color:"white",
          backgroundColor:colors.greenAccent[500],
          padding:"10px",
          position:"absolute",
          right:"10px",
          top:"-60px",
          fontSize:"10px",
          ":hover":{
            color:"white",
            backgroundColor:colors.redAccent[500],
          }

        }} variant="solid" size="small"  >Add ObjectType</Button>
        </Box>
              <DataGrid getRowId={(row) => row.objectTypeId} pageSizeOptions={[5, 10, 25]} paginationModel={{pageSize: 5,page: 0,}} rows={objectTypes && objectTypes?.length>0 && objectTypes.filter && objectTypes.filter((a)=>(a.objectTypeName!=="Root" && a.objectTypeName!=="Field" && a.objectTypeName!=="User"))} columns={columns} />
            </Box>
          </Box>)
            
    }
    </>

  );
};

export default AllObjectsTypes;
