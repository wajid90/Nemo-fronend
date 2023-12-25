import React, { useEffect, useState } from "react";
import { Alert, Autocomplete, Box, Button,Grid,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TextField, useTheme} from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from "@emotion/styled";
import toast from "react-hot-toast";
import { getAllObjectTypes } from "../../redux/Type/typeSlice";
import { getObjectInstance } from "../../redux/Instance/instanceSlice";
import { Router, useNavigate, useParams } from "react-router-dom";
import { useProSidebar } from "react-pro-sidebar";
import { ArrowBack } from "@mui/icons-material";

const Instances = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {isLoadding,addLoadding,objectTypes,isError,isSuccess,objectType:objType,successMessage,errorMessage}=useSelector((state)=>state.types);
  const {isLoadding:instLoadding,ObjectInstances}=useSelector((state)=>state.instances);
  const [open, setOpen] = React.useState(false);
  const [createdBy,setCreatedBy]=useState("");
  const [objectType,setObjectType]=useState("");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch=useDispatch(); 
  const params=useParams();
  const { collapsed } = useProSidebar();

  const navigation=useNavigate();


  useEffect(()=>{
   dispatch(getObjectInstance(params?.id));
  },[params?.id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
     setObjectType("");
    setCreatedBy("");
    setOpen(false);
  };

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
  const addInstance=async ()=>{
      console.log("hitt ...");

    if(objectType===""){
      return toast.error("Object Type Field is Required ....");
    }
    if( createdBy===""){
      return toast.error("Created By Field  is Required ....");
    }
     
     await handleClose();
    
  }
  const editHandler=()=>{
    console.log("hitt ...");
  }
  return (
    <>
    {
        isLoadding===true ?(
            <Loader/>
        ): (<Box  ml="20px"  mx="20px" mb="20px" maxWidth={"100%"} style={{
          
        }}>
            <Box display="flex" justifyContent="start" alignItems="center">
                <Box onClick={()=>navigation("/records")} style={{
                    padding:"10px",
                    borderRadius:"50%",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:colors.blueAccent[700],
                    marginRight:"10px",
                    cursor:"pointer"
                }}> <ArrowBack color="white" size={25}/></Box>
              <Header title={"Object Instances"} subtitle="Instances" />
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
        }}>Create Object Instance </DialogTitle>
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
          
        <Button onClick={addInstance} sx={{
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
          right: collapsed ? "30px" :'200px',
          top:"-40px",
          fontSize:"10px",
          ":hover":{
            color:"white",
            backgroundColor:colors.redAccent[500],
          }

        }} variant="solid" size="small"  >Create Instance</Button>
        </Box>
        <div style={{ height: 350, width:collapsed ? "100%" :'98%' ,marginTop:"20px" }}>
      {
         instLoadding === true ?  <div style={{marginLeft:"400px"}}> <Loader/></div> :  ObjectInstances && ObjectInstances.length>0? <>
          <Grid   spacing={3}>
            <Grid item xs={12} className="w-[90%]" style={{mx:"auto", maxWidth:collapsed ? "96%" :'93%' ,padding:"10px",marginTop:"20px",backgroundColor:colors.blueAccent[900]}}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
             <TableContainer sx={{ maxHeight: 440 }}>
               <Table stickyHeader aria-label="sticky table" >
                   <TableHead sx={{
                    "& .MuiTableCell-head": {
                        color: "white",
                        backgroundColor: colors.blueAccent[700]
                    },
                   }}>
                   <TableRow
                     sx={{
                        backgroundColor: colors.blueAccent[700]
                     }}
                   >
                     {
                        
                        ObjectInstances && Object.keys(ObjectInstances[0]).filter((a)=> a!=="MappingId" && a!=="ObjectId" && a!=="ParentObjectInstance" && a!=="IsDeleted" && a!=="Latitude" && a!=="Longitude" && a!=="EditedDate" && a!=="EditedBy" && a!=="RelationType").map((a)=>(
                          <TableCell>
                                {a}
                            </TableCell>
                        ))
                       

                     }
                      <TableCell style={{
                        width:"300px"
                      }}>
                        Action
                       </TableCell>
                      </TableRow>
                   </TableHead>
                   <TableBody>
                    
                   {
                    ObjectInstances && ObjectInstances.length>0 && ObjectInstances.slice && ObjectInstances.map &&  ObjectInstances.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data)=>(
                      <TableRow
                      key={data?.id}
                      style={{
                        backgroundColor:colors.blueAccent[900]
                       }}
                      >
                      {
                        Object.keys(data).filter((a)=> a!=="MappingId" && a!=="ObjectId" && a!=="ParentObjectInstance" && a!=="IsDeleted" && a!=="Latitude" && a!=="Longitude" && a!=="EditedDate" && a!=="EditedBy" && a!=="RelationType").map((a)=>(
                            <TableCell>
                                  {data[a]}
                              </TableCell>
                          ))
  
                       }
                   <TableCell style={{
                        width:"300px"
                      }}>
                      <Button variant="outlined" color="warning" size="small" onClick={editHandler}>Edit</Button>
                     </TableCell>
                      </TableRow>
                     ))
                    }
                   </TableBody>
                  </Table>
              </TableContainer>
              <TablePagination
                style={{
                  backgroundColor:colors.blueAccent[700]
                 }}
                    rowsPerPageOptions={[5,10, 25, 100]}
                    component="div"
                    count={ObjectInstances?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
              />
              </Paper>
            </Grid>
          </Grid>
        <Alert severity={"success"} style={{
         mx:"auto", maxWidth:collapsed ? "96%" :'93%'
        }}>object {ObjectInstances?.length} Instances Found ...</Alert>
        </>:<Alert severity={Array.isArray(ObjectInstances) && ObjectInstances.length>0 ? "success":"error"} style={{
            mx:"auto", maxWidth:collapsed ? "96%" :'93%'
        }}> {Array.isArray(ObjectInstances)? ObjectInstances?.length :"0"}  Instances Found ...</Alert>
         
      } 
     
        </div>
         </Box>
          </Box>)
            
    }
    </>

  );
};

export default Instances;
