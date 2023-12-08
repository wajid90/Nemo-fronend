import React, { useEffect, useMemo } from "react";
import { Alert, Autocomplete, Box, Button, CircularProgress, Grid, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllObjectTypes, getObjects, objectInstance  } from "../../redux/objectSlice";
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { Search } from "@mui/icons-material";

//
//var objType=["option1","option2"];

const options=["option1","option2"];

const ObjectInstance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {isLoadding,objects,objectTypes}=useSelector((state)=>state.objects);
  const dispatch=useDispatch();
  const {ObjectInstances}=useSelector((state)=>state.objects);
  const [object, setObject] = React.useState("");
 
  const [objecttypeId,setObjectTypeId] = React.useState("")
  const [objType, setobjType] = React.useState([]);

  const [inputObject, setInputObject] = React.useState("");
  const [obj, setObj] = React.useState([]);

  // const [ob, setob] = React.useState(()=>{
  //   return objects && objects.length>0 && objects.map(a => {
  //     console.log(a.objectValueType +" "+objecttypeId);
  //     if(a.objectValueType.toString()===objecttypeId){
  //       return  a.objectName;
  //     }
  //    return "";
  //  }).filter(a => a!=="");
  // });
  

  const [objectType, setObjectType] = React.useState("");
  const [inputObjectType, setInputObjectType] = React.useState("");

  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [createdBy, setCreatedBy] = React.useState("");
  const [objectCreatedBy, setObjectCreatedBy] = React.useState([]);


  
  const [inputCreatedBy, setInputCreatedBy] = React.useState("");


  useMemo(()=>{
      dispatch(objectInstance("10057"));
      dispatch(getAllObjectTypes());
      let obj =objectTypes && objectTypes.length>0 && objectTypes.map((a)=>{
          return {
            objectTypeId:a.objectTypeId,
            objectTypeName:a.objectTypeName,
          }
          });
          setobjType(obj);
  },[]);
  useEffect(()=>{
   let at= objects && objects.length>0 && objects.map(a => {
     //console.log(a.objectValueType +" "+objecttypeId);
     if(objecttypeId!=="" && objecttypeId){
      if(a.objectValueType.toString()===objecttypeId.toString()){
        return  a.objectName;
      }
     }  
     return "";
   }).filter(a => a!=="");
  setObj(at);
  },[objecttypeId,inputObjectType]);

  useMemo(()=>{
    let at= objects && objects.length>0 && objects.map(a => {
      if(objecttypeId!=="" && objecttypeId){
       if(a.objectValueType.toString()===objecttypeId.toString() && inputObject.toString()===a.objectName){
         return  a.createdBy;
       }
      }  
      return "";
    }).filter(a => a!=="");
    setObjectCreatedBy(at);
   },[objecttypeId,inputObject]);


 console.log(obj);

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
<Grid container spacing={1} mt={3}>
{ <Grid item xs={8} sm={6} md={4} lg={3}>
  <Autocomplete
        value={objectType}
        onChange={(event, newValue) => {
       //   console.log(newValue);
          setObjectTypeId(newValue?.objectTypeId);
          setObjectType(newValue);
        }}
        getOptionLabel={(option) => (option ? option.objectTypeName : "")}
        inputValue={inputObjectType}
        onInputChange={(event, newInputValue) => {
          setInputObjectType(newInputValue);
        }}
        id="controllable-states-demo"
        options={objType  || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Objects Type" />}
      />
  </Grid>
}
 {inputObjectType && objecttypeId!=="" && <Grid item xs={8} sm={6} md={4} lg={3}>
    <Autocomplete
        value={object}
        onChange={(event, newValue) => {
          console.log(newValue);
          setObject(newValue);
        }}
        //getOptionLabel={(option) =>option.)}
        inputValue={inputObject}
        onInputChange={(event, newInputValue) => {
          console.log(newInputValue);
         setInputObject(newInputValue);
        }}
        id="controllable-states-demo"
        options={obj || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Objects" />}
      />
  </Grid>
}
{
  inputObject && <Grid item xs={8} sm={6} md={4} lg={3}> 
  <DatePicker
   label="From Date"
   value={fromDate}
   onChange={(newDueDate) => setFromDate(newDueDate)}
   />
   </Grid>
} 
{
  inputObject &&   <Grid item xs={8} sm={6} md={4} lg={3}>
  <DatePicker
  slotProps={{ textField: { size: 'medium' } }}
  label="to Date"
  value={toDate}
  onChange={(newDueDate) => setToDate(newDueDate)}
/>
  </Grid> 
}
{
  toDate &&<Grid item xs={8} sm={6} md={4} lg={3}>
  <Autocomplete
        value={createdBy}
        onChange={(event, newValue) => {
          setCreatedBy(newValue);
        }}
        inputValue={inputCreatedBy}
        onInputChange={(event, newInputValue) => {
          setInputCreatedBy(newInputValue);
        }}
        id="controllable-states-demo"
        options={objectCreatedBy}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Created By" />}
      />
  </Grid>
}
<Grid item>
<Button variant="solid" size="large" endIcon={<Search />} sx={{padding:"15px",backgroundColor:colors.greenAccent[500]}}>Search</Button>
</Grid>

 </Grid>
      <div style={{ height: 350, width: '100%' ,marginTop:"20px"}}>
        {
          
           ObjectInstances!=null && ObjectInstances.length>0 ? <DataGrid getRowId={(row) => row.InstanceId}  rows={ObjectInstances} columns={columns} />:<Alert severity="error">Intances Doesn't  Found ...</Alert>
        
        }
      </div>
      </Box>
    </Box>
}
    </>
  );
};

export default ObjectInstance;
