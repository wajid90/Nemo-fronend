import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from "@emotion/styled";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import {  useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { addObjectOfObject, getObjects } from "../../redux/objectSlice";

const AllObjectsRecords = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {isLoadding,objects,isError,isSuccess,addLoadding,objData,message,successMessage,errorMessage}=useSelector((state)=>state.objects);
    const {objectTypes}=useSelector((state)=>state.types);

    const [open, setOpen] = React.useState(false);
    const [createdBy,setCreatedBy]=useState("");
    const [objectType,setObjectType]=useState("");
    const [objectName,setObjectName]=useState("");
    const [maxFields,setMaxFields]=useState(20);
    const [objectTypeName,setObjectTypeName]=useState("");
    const [inputObjectType,setInputObjectType]=useState("");

    const dispatch=useDispatch();
  
    useEffect(()=>{
      if(isError===true){
          toast.error(errorMessage)
          dispatch({
           type:"clearError"
          })
      }
      if(isSuccess===true && objData!==null){
       console.log("this is hit now ...");
       toast.success(successMessage);
       dispatch({
         type:"clearSuccess"
       })
       dispatch(getObjects());
      }
   },[isError,isSuccess,objData]);
  
  
   // console.log(createdBy + "  "+ objectTypeName + " " + objectName + " " + maxFields);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        setObjectName("");
        setMaxFields(1);
        setObjectType("");
        setCreatedBy("");
        setOpen(false);
    };
  
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
    const addObjectHandler= async ()=>{
      console.log("hitt ...");
    if(objectName===""){
        return toast.error("Object Name Field is Required ....");
    }
    if( maxFields===0){
        return toast.error("Max Field filds  is Required ....");
    }
    if(objectType.objectName===""){
      return toast.error("Object Type Field is Required ....");
    }
    if( createdBy===0 || createdBy===""){
      return toast.error("Created By Field  is Required ....");
    }
      
  
  
     await dispatch(addObjectOfObject({
       "ObjectName":objectName,
       "ObjectType":objectTypeName,
       "maxFields":maxFields,
       "CreatedBy":createdBy
      }))
     
     await handleClose();
    
  }
    return (
        <>
        {
          isLoadding===true ? (
              <Loader/>
          ):<>
          <Box  ml="20px"  mr="20px" mb="20px">
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
        <Dialog open={open} onClose={handleClose} PaperProps={{
            style: {
              backgroundColor:colors.blueAccent[900],
              boxShadow: "none",
              color:"black"
            },
          }}>
          <DialogTitle  sx={{
            color:"white"
          }}>Add Object </DialogTitle>
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
              id="objectName"
              label="Object Name"
              type="text"
              fullWidth
              variant="outlined"
              name="objectName"
              value={objectName}
              onChange={(e)=>setObjectName(e.target.value)}
              
              sx={{ width: 250,color: colors.blueAccent[800],"marginRight":"20px"}}
            />
        <TextField
        sx={{ width: 250,color: colors.blueAccent[800]}}
              margin="dense"
              id="maxFields"
              label="Max Fields"
              type="number"
              fullWidth
              variant="outlined"
              name="maxFields"
              value={maxFields}
              inputProps={{ min: 1, max: 10 }}
              min={1}
              max={1000}
              onChange={(e)=>setMaxFields(e.target.value)}
            /> 
          </Box>
          <Box sx={{
            display:"flex",
            alignItems:"center",
          }}>
    <Autocomplete
        value={objectType}
        onChange={(event, newValue) => {
          setObjectTypeName(newValue?.objectTypeName);
          setObjectType(newValue);
        }}
        freeSolo
        getOptionLabel={(option) => (option ? option.objectTypeName : "")}
        inputValue={inputObjectType}
        placeholder="Please select Object Type"
        setCustomKey={option => option.objectTypeId + option.objectTypeName}
        onInputChange={(event, newInputValue) => {
          setInputObjectType(newInputValue);
        }}
        id="controllable-states-demo"
        options={objectTypes && objectTypes?.length>0 && objectTypes.map && objectTypes.map((a)=>{
          if(a.objectTypeId.toString()==="1" || a.objectTypeId.toString()==="2" || a.objectTypeId.toString()==="6"){
           return "";
          }
          return {
           objectTypeId:a.objectTypeId,
           objectTypeName:a.objectTypeName,
         }
         
       }).filter(a => a!=="")  || []}
        sx={{ width: 250,color:"black",marginRight:"20px" }}
        renderInput={(params) => <TextField {...params} label="Objects Type"    />}
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
            
          <Button onClick={addObjectHandler} sx={{
               cursor:"pointer",
               color:"white",
               backgroundColor:colors.greenAccent[500],
               padding:"10px",
               ":hover":{
                color:"white",
                backgroundColor:colors.greenAccent[500],
               }
            }}> {addLoadding ===true ? "Add..":"Add"}</Button>
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
          <Button onClick={handleClickOpen} style={{
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
  
          }} variant="solid" size="small"  >Add Object</Button>
         </Box> 
           <DataGrid getRowId={(row) => row.objectId} paginationModel={{
            pageSize: 5,
            page: 0,
          }} pageSizeOptions={[5, 10, 25]} rows={objects &&  objects.length>0 && objects.filter && objects?.filter((a)=>(a.objectName!=="Root" && a.objectName!=="Field" && a.objectName!=="User")) || []} columns={columns} />
              </Box>
      </Box>
      </>
        }
      </>
    )
};

export default AllObjectsRecords;
