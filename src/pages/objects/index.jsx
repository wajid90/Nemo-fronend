import React, { useEffect, useMemo } from "react";
import { Alert, Autocomplete, Box, Button, CircularProgress,Grid,TextField,Typography, useTheme} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";

import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getObjectStrutureByObjectId} from "../../redux/objectSlice";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { Search } from "@mui/icons-material";
import Loader from "../../components/Loader";
import { getAllObjectTypes } from "../../redux/Type/typeSlice";
import { getObjectInstance } from "../../redux/Instance/instanceSlice";

var operator=["=","<",">","<=",">","<=",">"];
//let obj=[];

const AllObjects = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {isLoadding:objLoadding,objects,objectStruture}=useSelector((state)=>state.objects);
  const {isLoadding:typeLoadding,objectTypes}=useSelector((state)=>state.types);
  const {isLoadding:instLoadding,ObjectInstances}=useSelector((state)=>state.instances);
  const dispatch=useDispatch();
  const [object, setObject] = React.useState("");
 
  const [objecttypeId,setObjectTypeId] = React.useState("");
  const [objId,setObjectId] = React.useState("");

  const [objType, setobjType] = React.useState([]);
  const [obj, setobj] = React.useState([]);

  const [inputObject, setInputObject] = React.useState("");

  const [objectType, setObjectType] = React.useState("");
  const [inputObjectType, setInputObjectType] = React.useState("");

  // const [objectField, setObjectField] = React.useState([]);
  // const [objectStru, setobjectStru] = React.useState("");

  // const [fieldName, setFieldName] = React.useState("");
  // const [inputFieldName, setInputFieldName] = React.useState("");
  const [fieldOperator, setFieldOperator] = React.useState("");
  const [inputfieldOperator, setInputFieldOperator] = React.useState("");

  //const [mappingId,setMappingId] = React.useState("");

  // const [createdBy, setCreatedBy] = React.useState("");
  // const [objectCreatedBy, setObjectCreatedBy] = React.useState([]);
  
  // const [inputCreatedBy, setInputCreatedBy] = React.useState("");

  useEffect(()=>{
      let obj =objectTypes && objectTypes.length>0 && objectTypes.map((a)=>{
         if(a.objectTypeId.toString()==="1" || a.objectTypeId.toString()==="2" || a.objectTypeId.toString()==="6"){
          return "";
         }
         return {
          objectTypeId:a.objectTypeId,
          objectTypeName:a.objectTypeName,
        }
        
      }).filter(a => a!=="");
          setobjType(obj);
  },[]);
  useEffect(()=>{
    let at= objects && objects.length>0 && objects.map(a => {
      //console.log(a.objectValueType +" "+objecttypeId);
      if(objecttypeId!=="" && objecttypeId){
       if(a.objectTypeId.toString()===objecttypeId.toString()){
         return  {
           objectId:a.objectId,
           objectName:a.objectName,
         };
       }
      }  
      return "";
    }).filter(a => a!=="");
    
   setobj(at);
   },[objecttypeId]);


  // useMemo(()=>{
  // let at= objects && objects.length>0 && objects.map(a => {
  //     if(objecttypeId!=="" && objecttypeId && a.objectName){
  //      if(a.objectValueType.toString()===objecttypeId.toString() && inputObject.toString()===a.objectName){
  //        return  a.createdBy;
  //      }
  //     }  
  //     return "";
  //   }).filter(a => a!=="");

  //   setObjectCreatedBy(at);
  //  },[objecttypeId,inputObject]);

   useMemo( ()=>{
    if(objId && objId!==""){
      dispatch(getObjectStrutureByObjectId(objId));
    }
  
   },[objId,inputObject]);


  useMemo( ()=>{
    if(objectStruture && objId &&  objId!==""){
      dispatch(getObjectInstance(objId));
    }
  
   },[objId]);


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

  const customStyle = {
    width: '100px', // Adjust to your desired width
    height: '100px', // Adjust to your desired height
  };

  return (
    <>
    {
    (<Box ml="20px"  mr="20px" mb="20px">
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
          //console.log(newValue);
          setObjectId(newValue?.objectId)
          setObject(newValue);
        }}
       
        getOptionLabel={(option) =>(option ? option.objectName : "")}
        inputValue={inputObject}
        onInputChange={(event, newInputValue) => {
         setInputObject(newInputValue);
        }}
        id="controllable-states-demo"
        options={obj  || []}
       // objectByType && objectByType.length>0 && objectByType.map(a =>{ return {objectId:a.objectId, objectName:a.objectName}})
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Objects" />}
      />
  </Grid>
}
{  inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={3}>
     <TextField id="outlined-basic" label="FieldValue" variant="outlined" 
          placeholder="Enter Field Value"
          fullWidth
          disabled
          value={objectStruture && objectStruture.fieldName}
          />
          </Grid>
}
{  inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={3}>
    <Autocomplete
        value={fieldOperator}
        onChange={(event, newValue) => {
          console.log(newValue);
           setFieldOperator(newValue);
        }}
        //getOptionLabel={(option) =>(option ? option.objectName : "")}
        inputValue={inputfieldOperator}
        onInputChange={(event, newInputValue) => {
         setInputFieldOperator(newInputValue);
        }}
        id="controllable-states-demo"
        options={operator || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Operator" />}
      />
  </Grid>
}
{
    inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={3}>
     <TextField id="outlined-basic" label="FieldName" variant="outlined" 
          placeholder="Enter Field Value"
          fullWidth/>
</Grid>
}
{/* {
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
} */}
{/* {
  inputObject && objId!=="" &&<Grid item xs={8} sm={6} md={4} lg={3}>
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
} */}
<Grid item>
<Button variant="solid" size="large" endIcon={<Search />} sx={{padding:"15px",backgroundColor:colors.greenAccent[500]}}>Search</Button>
</Grid>

 </Grid>
 <div style={{ height: 350, width: '100%' ,marginTop:"20px"}}>
      {
         objects && objects.length>0? <DataGrid getRowId={(row) => row.objectId}  rows={objects.filter((a)=>a.isDeleted!==false)} columns={columns} />: <Alert severity="error">Objects Doesn't  Found ...</Alert>
      } 
      <Alert severity="success">Objects 5  Found ...</Alert>
  </div>
      </Box>
    </Box>)
}
  </>
  );
};

export default AllObjects;
